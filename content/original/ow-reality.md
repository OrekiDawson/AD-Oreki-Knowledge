---
title: "现实"
description: "原版 Wiki《Reality》条目的完整简体中文翻译：解锁、重置范围、现实机器公式、符文等级、自动成就与各子系统入口"
tags:
  - 原版Wiki翻译
  - 现实
original_title: "Reality"
original_url: "https://antimatterdimensions.wiki.gg/wiki/Reality"
original_revid: 3235
original_fetched_at: "2026-11-15T22:00:00+08:00"
original_license: "CC BY-SA 4.0"
original_license_url: "https://creativecommons.org/licenses/by-sa/4.0/"
translation_status: "REVIEWED"
review_status: "REVIEWED"
---

**现实（Reality）**是游戏的第三个、也是最后一个主要威望层：购买最终[时间研究](https://antimatterdimensions.wiki.gg/wiki/Time_Studies)后解锁，该研究需要 $\text{e}4,000$ [永恒点数](https://antimatterdimensions.wiki.gg/wiki/Eternity_Points)与前 13 行[成就](https://antimatterdimensions.wiki.gg/wiki/Achievements)。开始一次新现实会重置到此为止的整个游戏进度，换取现实机器、一枚符文与一个复兴点数。

现实在第一次执行新现实时引入[符文](https://antimatterdimensions.wiki.gg/wiki/Glyphs)、[现实升级](https://antimatterdimensions.wiki.gg/wiki/Reality_Upgrades)与[复兴](https://antimatterdimensions.wiki.gg/wiki/Perks)；同时引入[黑洞](https://antimatterdimensions.wiki.gg/wiki/Black_Hole)与[自动机](https://antimatterdimensions.wiki.gg/wiki/Automator)，后两者还有额外条件才能完全解锁。购买现实时间研究可以让玩家预览现实页签及其前 3 个子页签；执行第一次现实重置后才会显示黑洞与自动机页签。

这个威望层随「现实更新（Reality Update）」加入游戏——这是桌面版耗时 4.5 年开发的最后一个主要内容更新。该更新于 2022 年 12 月 17 日在网页版（与 Steam 版同步）发布，并于 2024 年 4 月 1 日移植到 Android。

## 重置

现实会重置永恒及以下的所有内容，包括全部货币与挑战完成记录。与前两个威望层不同，玩家在执行重置时还会失去[前 13 行成就](https://antimatterdimensions.wiki.gg/wiki/Achievements)及其奖励。统计页签「通用」标题下的全部数据与所有最佳挑战用时会在现实中保留。所有现实之前的页签仍然可以访问，即使对应功能重新被锁定。

玩家通常会根据最高永恒点数获得现实机器、[自选的一枚符文](https://antimatterdimensions.wiki.gg/wiki/Glyphs)与[$1$ 个复兴点数](https://antimatterdimensions.wiki.gg/wiki/Perks)。在第一次现实时，玩家会获得一枚只带反物质维度威力效果、固定稀有度为 $20\%$ 的威力符文；此外还会获得「同伴符文」，它显示玩家在第一次现实中达到的永恒点数。

完成第一次现实会解锁「重新开始当前现实」的选项：把玩家送回本次现实的起点。该选项位于符文页签。重新开始现实不会给予正常新现实应得的奖励，潜在的符文也不会改变。

## 现实机器

**现实机器**是现实威望层的主要货币，可用于购买[现实升级](https://antimatterdimensions.wiki.gg/wiki/Reality_Upgrades)或[黑洞](https://antimatterdimensions.wiki.gg/wiki/Black_Hole)。它的数量基于当前现实中达到的最高永恒点数，再加上玩家在永恒时本应获得的永恒点数。现实机器的获取有 3 条不同公式，使用哪一条取决于玩家当前的情况。

线性成长（$1-10$ RM）：$\left\lfloor\frac{27}{4,000}\log_{10}(EP)-26\right\rfloor$

指数成长（$>10$ RM）：$\left\lfloor1,000^{\frac{\log_{10}(EP)}{4,000}-1}\right\rfloor$

缩减成长（第一次现实中 $\text{e}6,000$ EP 以上）：$\left\lfloor1,000^{\frac{\log_{10}(EP)-0.75\left(\log_{10}(EP)-6,000\right)}{4,000}-1}\right\rfloor$

前 10 个现实机器在 $1.00\text{e}4,000$ EP 到 $2.15\text{e}5,333$ EP 之间按指数线性成长。超过 $10$ RM 后公式改为上面的指数式；在 $2.15\text{e}5,333$ EP 以上，指数式给出的 RM 比线性式更多。只有在第一次现实中，现实机器会在 $\text{e}6,000$ EP 以上被缩减，并在 $\text{e}8,000$ EP 封顶。这是因为现实更新为平衡难度做了改动，例如 $\text{e}6,000$ EP 以上时间维度的成本成长提高。该公式会让玩家在 $\text{e}6,000$ EP 时得到 $31$ RM、在 $\text{e}8,000$ EP 时得到 $74$ RM。

| 线性成长（1–10 RM）：RM | 对应 EP | 指数成长（>10 RM）：RM | 对应 EP | 缩减成长（首次现实 >e6,000 EP）：EP | RM |
| --- | --- | --- | --- | --- | --- |
| $1$ | $1.00\text{e}4,000$ | $20$ | $5.09\text{e}5,734$ | $\text{e}6,000$ | $31$ |
| $2$ | $1.41\text{e}4,148$ | $30$ | $3.13\text{e}5,969$ | $\text{e}6,250$ | $35$ |
| $3$ | $1.98\text{e}4,296$ | $40$ | $1.20\text{e}6,136$ | $\text{e}6,500$ | $39$ |
| $4$ | $2.78\text{e}4,444$ | $50$ | $1.96\text{e}6,265$ | $\text{e}6,750$ | $43$ |
| $5$ | $3.91\text{e}4,592$ | $60$ | $7.38\text{e}6,370$ | $\text{e}7,000$ | $48$ |
| $6$ | $5.50\text{e}4,740$ | $70$ | $1.35\text{e}6,460$ | $\text{e}7,250$ | $54$ |
| $7$ | $7.74\text{e}4,888$ | $80$ | $2.84\text{e}6,537$ | $\text{e}7,500$ | $60$ |
| $8$ | $1.09\text{e}5,037$ | $90$ | $4.54\text{e}6,605$ | $\text{e}7,750$ | $67$ |
| $9$ | $1.53\text{e}5,185$ | $100$ | $4.64\text{e}6,666$ | $\text{e}8,000$ | $74$ |
| $10$ | $2.15\text{e}5,333$ | $1,000$ | $1.00\text{e}8,000$ | RM 封顶于 $74$ |  |

## 符文等级

现实中的符文有一个等级，基于多种因素；随着游戏推进，这些因素会变得更复杂（例如玩家购买现实升级「**Measure of Forever**」后，永恒次数会提升符文等级）。符文的等级默认由永恒点数、[复制器](https://antimatterdimensions.wiki.gg/wiki/Replicanti)与[膨胀时间](https://antimatterdimensions.wiki.gg/wiki/Dilated_Time)的组合决定，最低为 1 级。符文的类型、效果与稀有度是随机的。

这 3 项初始因素使用玩家在当前现实中达到的最高值。

## 机制

### 自动成就

自动成就机制在现实中用于补偿玩家失去前 13 行[成就](https://antimatterdimensions.wiki.gg/wiki/Achievements)。虽然玩家需要重新完成每个成就的要求才能重新获得奖励，但他们会在基础间隔 $30$ 分钟下被动解锁下一个未完成的成就。自动完成可以关闭；关闭后计时器会倒数到零并暂停，取消暂停时立即完成另一个成就。计时器在离线时仍以相同速率前进。成就计时器的速度可以通过成就复兴节点提高。

购买 ACHNR 复兴节点后该机制会过时：玩家可以永久保留所有现实之前的成就，成就页签中与该功能相关的信息和按钮都会消失。

下表列出自动成就的不同间隔，以及完成全部前 13 行成就所需的最长时间。由于现实会保留通用统计中的数值与最佳挑战用时，成就 22、65、74、76、97 与 112 会在现实重置后立即解锁。

| 复兴节点 | 无 | ACH1 | ACH2 | ACH3 | ACH4 | ACHNR |
| --- | --- | --- | --- | --- | --- | --- |
| 间隔 | 30:00 | 20:00 | 12:00 | 6:00 | 2:00 | 立即 |
| 最长时间（无 Existentially Prolong） | 49:00:00 | 32:40:00 | 19:36:00 | 9:48:00 | 3:16:00 |  |
| 最长时间（有 Existentially Prolong；成就 41、47、48、51、52、53、61 因[永恒里程碑](https://antimatterdimensions.wiki.gg/wiki/Eternity_Milestones)在现实中保留） | 45:30:00 | 30:40:00 | 18:12:00 | 9:06:00 | 3:02:00 |  |

### 符文

主条目：[符文](https://antimatterdimensions.wiki.gg/wiki/Glyphs)

符文是可装备的升级，会对游戏的不同方面产生效果，并且只能在现实之间卸下。玩家每次现实都可以从多枚随机符文中选择一枚。

### 现实升级

主条目：[现实升级](https://antimatterdimensions.wiki.gg/wiki/Reality_Upgrades)

**现实升级**是一组消耗现实机器的升级，购买前需要先满足各自的条件。

### 复兴

主条目：[复兴](https://antimatterdimensions.wiki.gg/wiki/Perks)

**复兴**是类似永恒里程碑的可解锁功能，主要面向便利性与自动化。它们用复兴点数购买，复兴点数在每次现实后获得。

### 黑洞

主条目：[黑洞](https://antimatterdimensions.wiki.gg/wiki/Black_Hole)

**黑洞**会以周期循环让整个游戏运行得更快，影响到此为止游戏中的一切内容，效果等同于让游戏开够相应的时间。该功能需要 $100$ 现实机器解锁。

### 自动机

主条目：[自动机](https://antimatterdimensions.wiki.gg/wiki/Automator)

自动机是一个高级内置功能，使用脚本语言让玩家自动化现实中的许多部分。该功能需要 $100$ 自动点数解锁——自动点数通过购买现实升级与复兴、解锁黑洞或完成更多现实获得。

## 琐事

- 这个威望层的名字可能来自《反物质维度》官方 Discord 服务器中的一个高级身份组「Reality Dimension」。该身份组创建于 2017 年 12 月 14 日，比现实更新及其内容公布早一年多。
- 现实是三个威望层中唯一一个主要货币名称不以「Points（点数）」结尾的层。
- 现实也是三个威望层中唯一一个解锁条件不同于 1.80e308 [反物质](https://antimatterdimensions.wiki.gg/wiki/Antimatter_Dimensions) / [无限点数](https://antimatterdimensions.wiki.gg/wiki/Infinity_Points)的层。

## 来源与许可

- 原文：[Reality](https://antimatterdimensions.wiki.gg/wiki/Reality)（修订 ID `3235`；最后编辑者 KrutarMarsons；抓取于 2026-11-15）
- 原文贡献者与修订历史：[页面历史](https://antimatterdimensions.wiki.gg/index.php?title=Reality&action=history)
- 许可：[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)。本页为**简体中文翻译（改编）**，已修改：翻译正文与表格、统一术语、移除缩略图/信息框/导航模板、图片未转载；本页按相同许可共享。
- 原文以子模板嵌入符文、现实升级、复兴、黑洞与自动机的完整子页面；本页保留主条目正文与入口，这些子页列入后续批次。

## 相关条目

[[ow-eternity|永恒]] · [[ow-celestials|天神]] · [[ow-dilation|时间膨胀]]