---
title: "鹿颈长"
description: "原版 Wiki《Effarig》条目的完整简体中文翻译：远古遗物之神鹿颈长的遗迹碎片、商店升级、三层现实与削弱公式"
tags:
  - 原版Wiki翻译
  - 天神
original_title: "Effarig"
original_url: "https://antimatterdimensions.wiki.gg/wiki/Effarig"
original_revid: 3371
original_fetched_at: "2026-11-15T21:26:00+08:00"
original_license: "CC BY-SA 4.0"
original_license_url: "https://creativecommons.org/licenses/by-sa/4.0/"
translation_status: "TRANSLATED"
review_status: "NOT REVIEWED"
---

> 我的现实核心正在受苦。每一层都比上一层更难。
>
> 我希望你永远无法完成它。

**鹿颈长（Effarig，符号 ϟ）**是在[[ow-teresa|特蕾莎]]之后遇到的第二位[[ow-celestials|天神]]。把[[ow-teresa|特蕾莎的 RM 容器]]灌满即可直接解锁他们。解锁他们的同时会引入一种新资源——[遗迹碎片](#遗迹碎片)[^rs]，可在每次[[ow-reality|现实]]重置时获得。

他们的称号「远古遗物之神（Celestial of Ancient Relics）」与其主题——[符文](https://antimatterdimensions.wiki.gg/wiki/Glyphs)——相关。

原页另有子页面「引语（Quotes）」，本轮批次未译，见文末相关条目。

## 信息框要点

| 项目 | 内容 |
| --- | --- |
| 称号 | 远古遗物之神（Celestial of Ancient Relics） |
| 别号 | 疲惫者（Tired） |
| 解锁条件 | 向[[ow-teresa|特蕾莎的 RM 容器]]灌注 $1\text{e}24$ [[ow-reality|现实机器]] |
| 相关货币 | [遗迹碎片（RS）](#遗迹碎片) |
| 机制 | [鹿颈长的商店](#鹿颈长的商店) |
| 增益 | [符文](https://antimatterdimensions.wiki.gg/wiki/Glyphs)便利性；[[ow-replicanti|复制器]]；[[ow-infinity|无限次数]] |
| 现实解锁条件 | 购买「run」升级 |
| 现实惩罚 | [[ow-dimensions|维度]]、[计数频率](https://antimatterdimensions.wiki.gg/wiki/Tickspeed)与[游戏速度](https://antimatterdimensions.wiki.gg/wiki/Gamespeed)全部被膨胀削弱 |
| 现实奖励 | 鹿颈长符文 |
| 现实特性 | 可完成三次，每次对应一个[[ow-prestige|威望]]层 |
| 加入版本 | 网页版：现实更新（2022 年 12 月 17 日）；Android：现实更新（2024 年 4 月 1 日）；Steam 与 iOS：首发即包含 |

## 遗迹碎片

解锁鹿颈长后，会引入一种名为「遗迹碎片（Relic Shards）」的新资源，可在每次[[ow-reality|现实]]重置时获得。获得的遗迹碎片数量会随该次现实拥有的[[ow-eternity|永恒点数]]略微增加，但更显著地取决于该次现实中用过多少种不同的符文。

$$RS_{Gained} = \left \lfloor \left ( \frac{\log_{10}\left ( EP \right )}{7,500} \right )^{Distinct_{Glyph~Count}} \right \rfloor$$

遗迹碎片还会对[符文稀有度](https://antimatterdimensions.wiki.gg/wiki/Glyphs#Glyph_Rarity)提供固定加成，类似[[ow-reality-upgrades|现实升级]]「稀有度差异（Disparity of Rarity）」，但不是 $\times 1.3$ 的乘数，而是逐级提升：

$$Rarities \mathrel{+}= 5 \cdot \log_{10}\left ( \log_{10}\left ( RS + 10 \right ) \right )$$

遗迹碎片也可用于从[鹿颈长的商店](#鹿颈长的商店)购买升级。

## 鹿颈长的商店

与第一位天神类似，第二位天神也引入了一家商店，提供强力升级，例如[符文](https://antimatterdimensions.wiki.gg/wiki/Glyphs)的便利性、[高级符文机制](https://antimatterdimensions.wiki.gg/wiki/Advanced_Glyph_Mechanics)中的符文管理工具，以及解锁[鹿颈长的现实](#现实)。这些升级只能用[遗迹碎片](#遗迹碎片)购买。

| ID | 成本（RS） | 描述 |
| --- | --- | --- |
| adjuster | $1\text{e}7~(10~\text{M})$ | 可调整的[符文等级因子权重](https://antimatterdimensions.wiki.gg/wiki/Glyphs#Levels) |
| glyphFilter | $2\text{e}8~(200~\text{M})$ | [符文筛选](https://antimatterdimensions.wiki.gg/wiki/Advanced_Glyph_Mechanics#Glyph_Filter) |
| setSaves | $3\text{e}9~(3~\text{B})$ | [符文预设](https://antimatterdimensions.wiki.gg/wiki/Advanced_Glyph_Mechanics#Glyph_Presets) |
| run | $5\text{e}11~(500~\text{B})$ | [鹿颈长的现实](#现实) |

## 现实

鹿颈长的现实有三个可完成的部分，称为「层」，每层对应到目前为止出现的一个[[ow-prestige|威望层]]——即[[ow-infinity|无限]]、[[ow-eternity|永恒]]与[[ow-reality|现实]]。完成前一层即可进入下一层，其中鹿颈长的无限层最先可进入。

进入鹿颈长现实的任何一层时，施加的惩罚是对全部[[ow-dimensions|维度乘数]]、游戏速度与[计数频率](https://antimatterdimensions.wiki.gg/wiki/Tickspeed)的强力[[ow-dilation|膨胀削弱]]。[符文等级](https://antimatterdimensions.wiki.gg/wiki/Glyphs)在鹿颈长的现实中也会被设上限。鹿颈长现实的层数越高，这两种效果都会减弱。

膨胀惩罚可以被[[ow-infinity-dimensions|无限之力]]与[[ow-time-dimensions|时间碎片]]动态削弱：该层中无限之力越多，维度产量与游戏速度的惩罚越低；时间碎片则降低计数频率的惩罚。

| 层 | $c$ | 符文等级上限（GL Cap） | 奖励 | 详情 |
| --- | --- | --- | --- | --- |
| 无限 | $1,500.00$ | $100$ | [[ow-replicanti|复制器上限]]按无限次数乘以一个数值[^e1]；[[ow-infinity|无限次数]]提高你的[[ow-replicanti|复制器星系上限]][^e2]；鹿颈长现实中基础[[ow-infinity|无限点数]]获取被限制在 $1\text{e}200$；鹿颈长现实中每一类无限点数乘数被限制在 $1\text{e}50$ | 见脚注 |
| 永恒 | $29.29$ | $1,500$ | [[ow-eternity|永恒次数]]产生无限次数[^f1]；无限点数在鹿颈长的现实中不再受任何限制；你已解锁[[ow-nameless-ones|无名氏]] | 见脚注 |
| 现实 | $25.00$ | $2,000$ | 你已解锁[鹿颈长符文](https://antimatterdimensions.wiki.gg/wiki/Glyphs#Types)（最多只能装备一个，且部分效果互斥） |  |

表中 $c$ 是鹿颈长现实当前层的一个常数。

[^e1]: 复制器上限乘数：$1.80\text{e}308 * \max\left ( 1,~Infs^{120~\text{if}~TS_{31}~\text{is unlocked},~30~\text{otherwise}} \right )$；即解锁时间研究 31 时指数为 $120$，否则为 $30$。
[^e2]: 复制器星系上限增量：$\left \lfloor \frac{\log_{10}\left ( Replicanti_{Cap} \right )}{1.80\text{e}308} - 1 \right \rfloor$。
[^f1]: 该效果与永恒次数的数量成正比。

游戏速度与维度乘数的指数被提升到以 $\text{＾}0.25$ 为底。其最终指数由以下公式决定：

$$0.25 + 0.25 * nerfFactor\left (Infinity Power \right )$$

计数频率的指数被提升到以 $\text{＾}0.7$ 为底。其最终指数由以下公式决定：

$$0.7 + 0.1 * nerfFactor\left (Time Shards \right )$$

其中 $nerfFactor$ 由以下公式决定：

$$nerfFactor = 3 * \left( 1-\frac{c}{c+\sqrt{\log_{10}\left(resource\right)}} \right)$$

## 琐事

- 鹿颈长的名字源自「Giraffe」（长颈鹿）倒写；这来自一位知名开发者「SpectralFlame」，其头像经常被误认成长颈鹿[^cel-name-easter-egg]。
- 在正式发布之前（更准确地说，是开发稍晚的阶段），鹿颈长曾被称作[[ow-teresa|「特蕾莎」]]，也就是前一位天神。原因是两人的机制虽然未变，但名字最初被交换了顺序，鹿颈长本该是现实之神、特蕾莎本该是远古遗物之神[^cel-name-easter-egg]。

[^cel-name-easter-egg]: 原文参考资料：AD 开发日志第 4 篇 <https://cyip92.github.io/site/#/ADdevlog/4>（外部链接，未转载内容）。
[^rs]: 也称 RS（Relic Shards）；原文在术语区单独列出该缩写。

### 术语

原文用术语引用注明：遗迹碎片（Relic Shards）亦缩写为 RS。

### 脚注

原文此节的脚注已并入上方「现实」表格的脚注。

### 参考资料

原文此节仅含上述两条琐事引用的同一条开发日志链接；译文以脚注形式保留。

## 来源与许可

- 原文：[[ow-effarig|Effarig]]（页面 ID 378；修订 ID 3371；最后编辑者 KrutarMarsons；抓取于 2026-11-15）
- 原文贡献者与修订历史：[页面历史](https://antimatterdimensions.wiki.gg/index.php?title=Effarig&action=history)
- 许可：[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)。本页为**简体中文翻译（改编）**，已修改：翻译正文、表格与公式，统一术语，把信息框内容改写为要点表，把模板内脚注改为页内脚注，移除导航模板与模板结构，图片未转载；本页按相同许可共享。
- 原文图片未转载：原页含天神动画（Cel2-runreality-static--desktop.gif、Cel2-runreality-active--desktop.gif）、导航图（Cel2-navigation-complete--desktop.png）与界面截图（Cel2-interface--darktheme-desktop.png）。请到原页查看图片。

## 相关条目

[[ow-celestials|天神]] · [[ow-teresa|特蕾莎]] · [[ow-nameless-ones|无名氏]] · [[ow-reality|现实]] · [[ow-reality-upgrades|现实升级]] · [[ow-dilation|时间膨胀]] · [[ow-time-studies|时间研究]]
