# COPPER 3DP Project Handoff

## Current status — 2026-07-16

This section is the current source of truth. The May 2026 notes below are retained as project history where they do not conflict with this section, `AGENTS.md`, `README.md`, or `CONTENT_UPDATE_GUIDE.md`.

- The production site is `https://copper3dp.com` on the `main` branch.
- The secure online RFQ form at `/rfq/#rfq-form` is required and is connected to the current Salesforce and Google Ads conversion path. Do not remove, bypass, or weaken it.
- Email and WhatsApp are parallel contact options, not replacements for the online RFQ form.
- Ordinary content work must not modify `functions/api/rfq.ts`, `wrangler.jsonc`, or `src/components/forms/RfqForm.astro`.
- The main fixed navigation is Applications, Capabilities, Engineering Guides, and Submit RFQ. The Capabilities menu includes one restrained entry to the Copper AM knowledge center.
- The evidence-led knowledge center begins at `/knowledge/` and owns reference, comparison, evidence, terminology, quality, defect and source-index intent.
- Commercial service pages continue to own application and material service intent. Engineering articles own one bounded design, test, procurement or application decision.
- The dated 36-file Copper AM Industry Knowledge Base is imported into committed JSON through `scripts/import-copper-am-knowledge.py`; its complete file inventory and hashes are stored in `src/data/knowledge/generated/manifest.json`.
- The integration and anti-duplication rules are documented in `docs/seo/copper-am-knowledge-integration-roadmap.md`.
- The 200-topic daily publishing automation must compare new topics against fixed pages, 52 existing articles, the knowledge center and `docs/seo/content-publication-log.md` before publishing.
- Public equipment and third-party cases are evidence references only. They must not imply COPPER 3DP equipment ownership, customer relationships, certifications or test results.
- Required validation before publishing: `npm run check`, `npm run build`, `npm run check:links`, `npm run check:knowledge`, browser desktop/mobile QA, push, and production URL/canonical verification.

## Historical handoff — 2026-05-12

更新时间：2026-05-12

## 项目路径

```text
G:\Codex\copper3dp.com
```

生产站点：

```text
https://copper3dp.com
```

相关品牌/域名规划：

```text
copper3dp.com        当前主站
copper3dprint.com   支持性跳转域名，不做重复站
szcomo.com          Suzhou Como Precision Materials Co., Ltd. / Como Precision
titanium3dp.com     Titanium AM
ceramiccnc.com      Precision Ceramics
```

## 技术栈

- Astro 5，静态输出
- Astrowind 模板结构
- Tailwind CSS
- Astro content collections
- Markdown / MDX 工程文章
- RSS、sitemap、robots、canonical、JSON-LD 结构化数据
- Google Analytics / Google Ads 转化事件挂钩
- Astro image pipeline + `sharp`
- Markdown 增强：GFM、math、KaTeX

## 启动命令

```bash
npm install
npm run dev
```

本地预览默认地址：

```text
http://localhost:4321/
```

如果 4321 被占用，Astro 会自动换端口，终端会显示实际地址。

## 构建与检查命令

```bash
npm run check
npm run build
```

常用脚本：

```bash
npm run dev        # 本地开发
npm run build      # 生产构建
npm run preview    # 本地预览生产构建
npm run check      # Astro + ESLint + Prettier 检查
npm run fix        # 自动修复 ESLint / Prettier
```

构建输出目录：

```text
dist/
```

## 已完成内容

- 基于 Astrowind 搭建并深度定制 `copper3dp.com`。
- 首页已作为 SEO + Google Ads 双用途落地页打磨，当前方向是“发送图纸、数量、材料偏好和要求，我们评估后报价”。
- 默认视觉体验为暗色模式，整体风格已向简洁、专业、冷峻、工程感靠拢。
- 固定页面已做精简：
  - `/`：主落地页。
  - `/rfq/`：RFQ 输入说明。
  - `/contact/`：联系方式。
  - `/materials/`：材料说明。
  - `/copper-cold-plates/`、`/copper-heat-sinks/`：保留为重点应用页面。
  - `/about/`、`/privacy/`、`/terms/`：保持纯文字、克制、文档式。
- `/applications/` 和 `/capabilities/` 已合并到主站逻辑，不作为独立重点页面竞争。
- 页脚已简化，保留核心入口、品牌说明、邮件、相关站点入口。
- 全站邮件 CTA 统一为 `info@szcomo.com`，并修复移动端复制/发邮件时邮箱后缀混入 query 参数的问题。
- WhatsApp 入口已按用户号码配置，入口语义从复杂二级菜单简化为直接 WhatsApp 联系。
- 已配置并维护 Google Ads / GA 相关事件挂钩，重点转化意图为 email RFQ click / lead。
- 已建立技术 SEO 基础：
  - sitemap
  - robots
  - canonical
  - trailing slash
  - JSON-LD
  - RSS
  - noindex 弱页面控制
  - 静态遗留 URL 兼容
- 已建立博客系统：
  - 工程文章 Markdown 存放于 `src/data/post/`
  - 支持 tags、category、相关内容、RSS、sitemap
  - Markdown 支持表格、公式、GFM
- 已加入多篇高价值工程内容，覆盖：
  - copper cold plates
  - copper heat sinks
  - microchannel heat exchangers
  - RF / vacuum copper parts
  - semiconductor equipment
  - AI accelerator cooling
  - data center power and cooling
  - liquid-cooled server copper hardware
  - busbars and induction coils
  - CT / leak / inspection
  - process selection
  - RFQ preparation
- README 已写入 TITAN 工业 SEO 图片提示词协议，用于后续文章配图生成。

## 当前未完成任务

- 用户最近提出“更新几篇高价值博文”，但本次任务切换为生成交接文件，因此新增博文尚未执行。
- 后续如继续内容更新，应先盘点 `src/data/post/` 现有主题，避免重复生产低价值文章。
- Google Ads 后续数据评估需要以实际投放数据为准，不能只看早期极小样本。
- 新增文章如需要配图，应按 README 的 `Image Prompt Protocol` 生成新图，不要随意复用旧图。

## 设计风格

整体方向：

- 简洁
- 专业
- 冷峻
- 工程感
- B2B 询盘导向
- 不营销化、不花哨、不堆叠模块

页面原则：

- 首页可以承担完整转化叙事。
- 其他固定页面应尽量短、明确、低噪音。
- 能用“左文右图 / 左图右文”解决的模块，不引入复杂新结构。
- 重要提示条、模块标题、信息卡底色要保持全站一致。
- 图片必须服务内容，不做装饰。
- 不使用与铜 3D 打印无关的通用工厂图、抽象科技图、低质 stock 图。

文案原则：

- 不过度承诺。
- 不说 instant quote、guaranteed、universal feasibility 等不稳妥表达。
- 核心表达是：发送 CAD / drawing / quantity / material preference / lead time / critical requirements；我们根据图纸和要求评估并报价。
- 简单项目可基本报价；复杂项目可能先澄清关键要求。
- 报价交付物和沟通深度取决于客户给出的信息和项目复杂度。

## 重要注意事项

- 不要写入任何敏感密钥、后台 token、账号密码。
- Google / Ads / Analytics 相关 ID 和环境变量应放在部署环境，不应硬编码进源代码。
- 不要随意修改转化事件名称，Ads 和 GA 学习依赖事件连续性。
- 不要随意改 canonical、trailing slash、sitemap、robots 逻辑。
- 不要让弱 tag 页、重复固定页、薄内容页进入 sitemap。
- 不要为了“造词量”批量铺低价值文章。
- 不要复制已有文章换标题再发布。
- 新增内容必须回答真实工程/采购决策问题。
- 新增图片需压缩并放入合理目录，通常为：

```text
src/assets/images/generated/
```

- 生产构建后检查：
  - `dist/sitemap-index.xml`
  - `dist/sitemap-0.xml`
  - `dist/robots.txt`
  - 核心页面 canonical
  - 主要 CTA 是否仍指向 `info@szcomo.com`
  - 移动端 header/footer/CTA 是否正常

## 不要改动的地方

除非有明确证据和必要性，不要改：

- 首页核心转化逻辑。
- email-first RFQ 机制。
- `info@szcomo.com` 作为主询盘邮箱。
- 暗色默认视觉方向。
- `src/config.yaml` 中站点 URL、trailing slash 等基础 SEO 设置。
- `src/utils/structured-data.ts` 的结构化数据逻辑，除非同步验证 JSON-LD。
- `src/navigation.ts` 中已精简过的主导航和页脚结构。
- Google Ads / GA 事件命名和触发点。
- `/about/`、`/privacy/`、`/terms/` 的纯文字、克制风格。
- 已合并或重定向的低价值固定页面策略。
- `README.md` 中的 SEO、内容和图片提示词协议。

## 下一步建议

优先级从高到低：

1. 内容增量：新增 2-3 篇真正高价值工程文章，先盘点存量再选题。
2. 内容方向建议：
   - copper AM cleaning and powder removal for internal channels
   - copper AM inspection planning for pressure and vacuum parts
   - CuCrZr vs pure copper for high-current and thermal hardware
   - copper AM RFQ mistakes that delay quotation
   - copper additive manufacturing for compact power electronics cooling
3. 每篇新文章配一张新图，按 README 的 `Image Prompt Protocol` 生成，不复用旧图。
4. 新文章发布前跑：

```bash
npm run check
npm run build
```

5. 发布后检查 sitemap 是否包含新文章，canonical 是否正确。
6. Ads 有足够数据后，再按搜索词、地区、设备、时段、转化质量做调整，不要基于极小样本频繁大改。
7. 若继续优化首页，只处理真实问题：首屏转化、移动端可读性、CTA 清晰度、加载性能、图片匹配度。
