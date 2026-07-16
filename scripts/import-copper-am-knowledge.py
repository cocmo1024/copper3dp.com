#!/usr/bin/env python3
"""Convert the dated Copper AM research library into build-ready JSON.

The source library remains the evidence record. Generated JSON keeps every
row and raw field, adds stable slugs and a conservative A/B/C/D evidence tier,
and is committed so production builds do not depend on a desktop-only path.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urlparse


DATASETS = {
    "technical": "01_技术知识点与参数.csv",
    "equipment": "02_设备与材料系统.csv",
    "applications": "03_应用领域.csv",
    "cases": "04_官方案例.csv",
    "topics": "05_内容选题.csv",
    "schedule": "06_十二周详细排期.csv",
    "sources": "07_来源总表.csv",
    "rfq": "08_RFQ清单.csv",
    "defects": "09_难点诊断.csv",
    "glossary": "10_术语表.csv",
    "leadMagnets": "11_Lead_Magnets.csv",
    "cadence": "12_十二周主题节奏.csv",
}

APPLICATION_SLUGS = {
    "APP-01": "space-launch-propulsion",
    "APP-02": "ai-data-center-thermal-management",
    "APP-03": "heat-exchangers-cold-plates",
    "APP-04": "rf-waveguides-accelerators",
    "APP-05": "induction-heating-coils",
    "APP-06": "tooling-conformal-cooling",
    "APP-07": "motors-drives-power-electronics",
    "APP-08": "automotive-electric-vehicles",
    "APP-09": "marine-naval-offshore",
    "APP-10": "energy-fusion-high-heat-flux",
    "APP-11": "electrochemical-reactors",
    "APP-12": "medical-antimicrobial-research",
    "APP-13": "semiconductor-advanced-packaging",
}

CATEGORY_LABELS = {
    "应用/案例": "Applications and cases",
    "设备产品": "Equipment products",
    "设备厂商": "Equipment manufacturers",
    "铜材料证据": "Copper material evidence",
    "材料体系": "Material systems",
    "工艺原理": "Process fundamentals",
    "缺陷机理": "Defect mechanisms",
    "测试与标准": "Testing and standards",
    "标准": "Standards",
    "工艺参数": "Process parameters",
    "测试": "Testing",
    "NotebookLM": "Knowledge-base operations",
    "纯铜设备": "Pure-copper equipment",
    "后处理": "Post-processing",
    "原料与粉末": "Feedstock and powder",
    "材料与火箭应用": "Materials and propulsion",
    "材料与参数": "Materials and parameters",
    "大型增材": "Large-format additive manufacturing",
    "测量科学": "Measurement science",
    "研究前沿": "Research frontier",
    "铜合金材料": "Copper alloys",
}


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        return [dict(row) for row in csv.DictReader(handle)]


def source_domain(url: str) -> str:
    return urlparse(url).netloc.lower().removeprefix("www.")


def normalize_evidence(raw: str, *, url: str = "", organization: str = "", category: str = "") -> str:
    label = (raw or "").strip()
    upper = label.upper()

    if upper.startswith("A"):
        return "A"
    if upper.startswith("B"):
        return "B"
    if upper.startswith("C"):
        return "C"
    if upper.startswith("D"):
        return "D"

    joined = " ".join([label, organization, category, source_domain(url)]).lower()
    primary_markers = (
        "peer review",
        "同行评审",
        "government",
        "政府",
        "standard",
        "标准",
        "research",
        "研究",
        "nasa",
        "nist",
        "ornl",
        "fraunhofer",
        "cern",
        "doi.org",
        "iso.org",
        "astm.org",
        ".gov",
        ".edu",
    )
    official_markers = ("official", "官方", "manufacturer", "厂商", "数据表", "产品")

    if any(marker in joined for marker in primary_markers):
        return "A"
    if any(marker in joined for marker in official_markers) or upper == "HIGH":
        return "B"
    if upper == "MEDIUM":
        return "C"
    return "U"


def write_json(path: Path, value: object) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def build_library_inventory(library_root: Path) -> list[dict[str, object]]:
    inventory: list[dict[str, object]] = []
    for path in sorted(item for item in library_root.rglob("*") if item.is_file()):
        digest = hashlib.sha256()
        with path.open("rb") as handle:
            for block in iter(lambda: handle.read(1024 * 1024), b""):
                digest.update(block)
        inventory.append(
            {
                "path": path.relative_to(library_root).as_posix(),
                "bytes": path.stat().st_size,
                "sha256": digest.hexdigest(),
            }
        )
    return inventory


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True, type=Path, help="Path to the knowledge-base CSV directory")
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("src/data/knowledge/generated"),
        help="Generated JSON directory",
    )
    parser.add_argument("--version", default="2026-07-16")
    args = parser.parse_args()

    source_dir = args.source.resolve()
    dataset_dir = source_dir / "CSV" if (source_dir / "CSV").is_dir() else source_dir
    library_root = source_dir if dataset_dir != source_dir else source_dir.parent
    output_dir = args.output.resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    datasets: dict[str, list[dict[str, str]]] = {}
    for key, filename in DATASETS.items():
        source_file = dataset_dir / filename
        if not source_file.exists():
            raise FileNotFoundError(source_file)
        datasets[key] = read_csv(source_file)

    for row in datasets["sources"]:
        row["evidence_tier"] = normalize_evidence(
            row.get("evidence_level", ""),
            url=row.get("url", ""),
            organization=row.get("organization", ""),
            category=row.get("category", ""),
        )
        row["category_en"] = CATEGORY_LABELS.get(row.get("category", ""), row.get("category", ""))
        row["domain"] = row.get("domain") or source_domain(row.get("url", ""))

    source_index = {row["source_id"]: row for row in datasets["sources"]}

    for row in datasets["technical"]:
        source = source_index.get(row.get("source_id", ""), {})
        row["evidence_tier"] = normalize_evidence(
            row.get("evidence_level", ""),
            url=row.get("source_url", ""),
            organization=source.get("organization", ""),
            category=row.get("topic", ""),
        )

    for row in datasets["equipment"]:
        claim = row.get("evidence_claim", "")
        match = re.match(r"\s*([ABC])(?:[-—:]|\b)", claim, flags=re.IGNORECASE)
        row["evidence_tier"] = match.group(1).upper() if match else normalize_evidence(
            row.get("confidence", ""),
            url=row.get("evidence_url", ""),
            organization=row.get("manufacturer", ""),
            category="equipment",
        )

    for row in datasets["applications"]:
        row["slug"] = APPLICATION_SLUGS[row["id"]]

    for dataset_name in ("cases", "topics"):
        for row in datasets[dataset_name]:
            row["evidence_tier"] = normalize_evidence(
                row.get("evidence_level", ""),
                url=row.get("source_url", ""),
                organization=row.get("source_org", ""),
                category=row.get("application_en", ""),
            )

    unresolved: dict[str, list[str]] = {}
    for dataset_name in ("technical", "equipment", "cases", "topics", "schedule"):
        missing = sorted(
            {
                row.get("source_id", "")
                for row in datasets[dataset_name]
                if row.get("source_id") and row.get("source_id") not in source_index
            }
        )
        unresolved[dataset_name] = missing

    if any(unresolved.values()):
        raise ValueError(f"Unresolved source IDs: {unresolved}")

    for key, rows in datasets.items():
        write_json(output_dir / f"{key}.json", rows)

    library_inventory = build_library_inventory(library_root)
    manifest = {
        "version": args.version,
        "source": "Copper AM Industry Knowledge Base",
        "counts": {key: len(rows) for key, rows in datasets.items()},
        "normalizedEvidenceTiers": ["A", "B", "C", "D", "U"],
        "sourceIntegrity": {
            "uniqueSourceIds": len(source_index),
            "uniqueSourceUrls": len({row["url"] for row in datasets["sources"]}),
            "unresolvedReferences": unresolved,
        },
        "libraryInventory": {
            "fileCount": len(library_inventory),
            "files": library_inventory,
        },
        "publicDestinations": {
            "technical": "/knowledge/materials-and-properties/ and /knowledge/process-selection/",
            "equipment": "/knowledge/equipment/",
            "applications": "/knowledge/applications/",
            "cases": "/knowledge/case-library/",
            "sources": "/knowledge/sources/",
            "rfq": "/rfq/ and /knowledge/quality-and-qualification/",
            "defects": "/knowledge/defects/",
            "glossary": "/knowledge/glossary/",
            "topics": "Internal SEO coverage map; not published as one page per title",
        },
    }
    write_json(output_dir / "manifest.json", manifest)


if __name__ == "__main__":
    main()
