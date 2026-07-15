# COPPER 3DP 内容更新执行指南

本指南适用于 `copper3dp.com` 的工程文章、固定内容页、内链和文章图片更新。任何人或 Agent 在改内容前都必须先读本文件；若任务只要求内容更新，不得顺手改首页结构、部署配置或 RFQ 接口。

## 1. 项目中的真实入口

- 工程文章源文件：`src/data/post/*.md` 或 `*.mdx`
- 文章 schema：`src/content/config.ts`
- 文章生产 URL：`/posts/EngineeringGuide/{文件名}/`
- 文章路由、canonical 与 JSON-LD：`src/pages/[...blog]/index.astro`
- 相关文章规则：`src/utils/blog.ts`（由标题、slug、category、tags 和主题族自动计算）
- 固定内容页：`src/pages/`
- 图片源文件：`src/assets/images/`
- sitemap/lastmod 逻辑：`astro.config.ts`
- 内容发布记录：`docs/seo/content-publication-log.md`
- RFQ 表单与接口：`src/components/forms/RfqForm.astro`、`functions/api/rfq.ts`、`wrangler.jsonc`

不要手工编辑 `dist/`。它是构建产物。

## 2. 先决定“更新旧页”还是“新增页”

默认优先刷新已有高意图 URL，不以文章数量为目标。

1. 获取尽可能新的 GSC 数据，至少导出最近 3 个月和最近 6 个月的 **Queries** 与 **Pages**。记录 clicks、impressions、CTR、average position 及主要查询。
2. 用 GSC 建立“页面 -> 查询 -> 用户要做的工程决策”映射。没有最新 GSC 时，可以做事实修正和明显质量补强，但不要据旧表大规模新建、合并、删除或 noindex。
3. 搜索现有题目、标题、slug、tags 和正文，不能只看文件名：

   ```powershell
   rg -ni "关键词|同义词|材料牌号|应用名称" src/data/post src/pages ARTICLE_TOPICS.md CASE_STUDY_CONTENT_PLAN.md
   ```

4. 若已有页面能回答同一主要问题，更新该 URL；不要换几个词再建竞争页。
5. 只有在搜索意图、工程决策和 RFQ 输入都明显不同，且现有页无法合理承载时才新增文章。
6. 合并或下线页面前，必须检查最新 GSC、外链、内部链接和 sitemap 角色，并准备永久重定向。不得直接删除已有索引 URL。

每篇文章应能用一句话回答：**谁在什么条件下，需要在什么选项之间做什么决定？** 如果两篇文章的答案相同，先合并意图。

## 3. URL、frontmatter 与日期规则

已有文章的文件名就是 slug。不要重命名文件、改变 `EngineeringGuide` 路径大小写，或去掉尾斜杠。已有 canonical 必须保留；需要迁移时先制定 301，再改 URL。

新文章 frontmatter 使用项目 schema 中已有字段，例如：

```yaml
---
title: '面向读者的明确标题'
publishDate: 2026-07-15
updateDate: 2026-07-15 # 新文通常可省略；只有实质更新才添加或修改
excerpt: '说明工程问题、选择范围和读者可获得的结论。'
category: Engineering Guide
tags:
  - copper-additive-manufacturing
  - material-selection
  - rfq-specification
author: 'COPPER 3DP Engineering'
image: ~/assets/images/generated/example-cover.webp
metadata:
  title: '简洁、独特的 SEO 标题'
  description: '与正文一致的独特描述，不堆关键词。'
  canonical: https://copper3dp.com/posts/EngineeringGuide/example-slug/
---
```

- `publishDate` 表示首次实际发布日，刷新旧文时不得改成今天。
- `updateDate` 只在事实、比较、决策逻辑、来源或 RFQ 指引发生实质变化时更新；纠正标点不算内容更新。
- canonical 必须是 `https://copper3dp.com` 的绝对 URL、与真实生产路径完全一致并带尾斜杠。
- `metadata.title`、description、H1 和正文必须描述同一意图；标题要自然，不用年份或“终极指南”制造虚假新鲜度。
- 未完成文章使用 `draft: true`，不要靠从 sitemap 手工排除来隐藏半成品。
- 新增文章成功上线后才追加 `docs/seo/content-publication-log.md`，记录真实 URL、日期、commit 和生产验收；不要预先标记完成。

## 4. 技术声明和来源边界

### 4.1 数值必须带条件

所有材料、工艺、公差和性能数字都要能回答：材料牌号、化学成分/状态、设备或工艺路线、成形方向、热处理和后处理、试样/零件位置、测试方法、数据来源是什么。

- 纯铜、CuCrZr、CuCr1Zr、GRCop 等不能只写“铜”。牌号和状态不明确时，用“候选路线”“需供应商数据和试样确认”。
- 纯铜的高导电/导热能力不能写成所有 LPBF 零件的保证值；激光波长、粉末、致密度、方向、热处理、温度和测试方法都会改变结果。
- CuCrZr/CuCr1Zr 的强度、硬度和导电率依赖成分范围、固溶/时效路线及最终状态。不要把原材、粉末供应商典型值或单个论文试样值当作成品保证。
- 不得把热导率与电导率、IACS 与体积电阻率、室温与工作温度下的性能混用。
- 最小壁厚、孔径、通道、表面粗糙度、尺寸公差、密度、泄漏率和压力能力只能写成有条件的设计/报价起点，不得写成所有几何和批次都能保证的通用能力。
- “可打印”不等于“可清粉、可机加工、可检测、可密封或可在目标工况中验收”。正文要把这些门槛拆开。

优先引用可追溯的一手来源：标准组织的标准页或正式标准、材料/设备厂商正式数据表、同行评审论文、政府/大学/研究机构报告。来源必须能直接支持相邻声明，链接到具体页面，不用搜索结果页、营销转载或 AI 生成摘要。标准需写明标准号和版本/年份；不能访问全文时，不推测其条款。

建议写作前维护一张临时核验表：`声明 | 数值/结论 | 条件 | 来源 | 是否可对客户承诺`。无法核验的精确数字应删掉或改成需项目验证的定性表述。

### 4.2 案例与能力声明

- 只有具备可核验证据并获得发布许可时，才写“客户案例”“我们实现了”或客户/项目名称。
- 没有这些证据时必须明确标成“代表性设计审查场景”“示例验收计划”或“假设性比较”，不得虚构客户、机器批次、节省比例、温降、寿命、良率或认证结果。
- 不声称未核实的认证、设备数量、专利、检测能力、交期、最低价格或全球服务覆盖。
- 网站内容只是工程筛选信息，不替代图纸、仿真、安全评估、材料证书、首件验证或项目验收计划。

## 5. 一篇可发布文章的最低结构

不要机械追求字数。文章至少要提供一个现有页面没有提供的工程决定，并按需要包含：

1. 开头直接回答：何时适合、何时不适合、还缺什么输入。
2. 决策表：候选材料/工艺、适用条件、主要代价、必须验证的证据。表格单元格保持短，移动端能横向阅读。
3. 设计与制造边界：几何、清粉、支撑、热处理、机加工、密封面、清洁和装配。
4. 性能与验收：将“典型参考值”与“图纸/采购要求”分开，说明试样、方法和最终零件验证。
5. 失败或不适用条件：说明何时 CNC、钎焊、传统铜材或另一合金更合理。
6. 可执行 RFQ 清单。
7. 直接支持关键结论的来源。

RFQ 清单应按题目选择相关项，通常包括：CAD 与带 GD&T 图纸、数量/年度需求、材料牌号与最终状态、优先导热/导电还是强度、工作温度与介质、流量和压降、设计/试验压力、可接受泄漏率及测试方法、关键通道与清粉路径、机加工基准/余量、表面和清洁要求、CT/尺寸/材料证书/试样要求、目标时间。未知项可以明确写“待定”，不能替客户假设。

## 6. 内链、主题结构、JSON-LD 与图片

- 固定页内链带尾斜杠，例如 `/materials/`、`/copper-cold-plates/`、`/copper-heat-sinks/`、`/capabilities/`、`/rfq/`。
- 链接锚文本说明读者下一步会看到的决定，不用大量重复的“点击这里”。每篇文章只链真正相邻的材料、应用、检查或 RFQ 页面。
- `category` 和 `tags` 影响归档及 `src/utils/blog.ts` 的相关文章排序。先复用现有规范 tag；不要为单篇文章制造多个近义标签。
- 文章 canonical、Breadcrumb 和 BlogPosting JSON-LD 由 `src/pages/[...blog]/index.astro` 及 `src/utils/structured-data.ts` 生成。内容更新不要在 Markdown 中再硬编码一份 JSON-LD；若改结构化数据，必须同步验证页面可见内容与 schema 一致。
- 图片必须有版权/生成来源和真实工程意义。优先使用 `src/assets/images/` 中可由 Astro 优化的 WebP/PNG/JPG；不要引用本地绝对路径、超大原图或不稳定的第三方热链。
- 图片要说明零件、内部通道、失效、检测或选型，不为了“丰富页面”而添加。alt 描述看得见的工程内容，不塞关键词；图片中的端口、密封面、通道和材料外观不能违反正文工程逻辑。

## 7. RFQ 接口是内容更新的保护区

普通内容任务不得改动以下文件和行为：

- `functions/api/rfq.ts`
- `wrangler.jsonc` 中 `/api/*` Worker-first、邮件、限流和资产绑定
- `src/components/forms/RfqForm.astro` 的字段名、上传限制、Turnstile 和提交行为

不要给 `/api/rfq` 添加缓存规则，不要在文章里复制表单或更改 API 请求格式。内容只需链接 `/rfq/` 或现有表单。若任务确实要求改 RFQ，必须作为独立高风险改动验证邮件绑定、限流、附件验证、Turnstile、错误状态和 `Cache-Control: no-store`。

## 8. 本地验收

在仓库根目录执行：

```powershell
npm run check
npm run build
npm run check:links
npx wrangler deploy --dry-run
```

然后检查目标生成页，而不是只看 Markdown：

```powershell
npm run preview
# 另开终端访问目标页，并查看页面、canonical、唯一 H1、内链、表格和移动端布局
```

必须确认：

- `npm run check`、构建和本地链接检查均通过；没有缺图、坏链或 frontmatter/schema 错误。
- 目标页的 canonical 唯一且正确；BlogPosting 与 Breadcrumb JSON-LD 可解析，日期与可见内容一致。
- 文章只有一个清晰 H1，标题/description 不与现有页面重复，所有内部链接落到生成文件。
- 桌面与窄屏下表格可读，图片没有造成布局偏移或首屏超大下载。
- sitemap 包含应索引的新/更新 URL，`lastmod` 只反映真实 `publishDate`/`updateDate`。
- diff 只包含任务要求的内容、图片及必要 hub/记录变更；`dist/`、密钥、用户资料不能提交。

## 9. 上线与生产验收

只有在本次改动、远端推送和部署均已获得明确授权时，才按范围暂存并发布：

```powershell
git add <本次明确修改的文件>
git commit -m "Update <copper topic> content"
git push origin main
npx wrangler deploy
```

仓库已锁定 Wrangler `4.110.0`。如果 Cloudflare Git 集成是当前唯一部署链路，`git push` 即为部署触发器，不要再手动部署；发布前先确认只使用一条链路。

推送和部署完成、生产版本传播后再执行：

```powershell
npm run check:production
curl.exe -sSI "https://copper3dp.com/posts/EngineeringGuide/{slug}/"
curl.exe -sSI "https://copper3dp.com/api/rfq"
```

- 新/更新 URL 返回 `200`，HTTP/www 规范化后只剩一个 HTTPS apex URL。
- 页面 canonical、H1、可见更新日期、JSON-LD、内链、图片和 sitemap 均与本地一致。
- `/api/rfq` 的只读探测应保持非成功提交状态（当前 GET/HEAD 预期 `405`）且 `Cache-Control: no-store`；不要用测试 POST 发送垃圾 RFQ。
- 若生产 sitemap 尚未同步，等待部署传播再重跑，不要为了让检查通过而删本地 URL。
- 记录真实 commit 和验收结果后，才更新发布日志。随后在 GSC 对重要更新 URL 请求重新抓取，并在后续 2--8 周比较同一 query/page 组，而不是用全站总曝光判断单页效果。
