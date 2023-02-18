# Elden Ring Utils
_Some maths related to Elden Ring rune calculations_

I've been playing Elden Ring a _lot_ recently, and I have always struggled finding the optimal number of Golden Runes in my inventory without being wasteful... So I decided the only way forward was to make an NPM package I can then use on a website in order to deal with this nasty maths for me. By nasty I mean simple. I just refuse to Think while playing videogames.

---


## How to Use

```typescript

import * from @nlovell/eldenringutils


/*
 * Calculates which Golden Runes should be 'popped' in order to minimally achieve the required total cost
 * [{ runeLevel: 2, value: 400, count: 1 }]
 */
goldenRunesNeeded(800, 1100); 


```

