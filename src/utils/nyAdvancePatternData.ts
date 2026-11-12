/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * NY WINGO ADVANCE PATTERNS DATA
 * Compiled from NY WINGO ADVANCE PATTERNS.txt
 * - SURESHOT_DB: 582 calibrated 7-10 char pattern sequences
 * - CLEAN_500_PATTERNS: 500 named Wingo patterns (001_ZIGZAG to 500_GENERATED_89)
 */

export interface Pattern500Entry {
  id: string;
  name: string;
  seq: string;
  target: 'BIG' | 'SMALL';
  category: string;
}

export const SURESHOT_DB: Record<string, string> = {
  "BSBSBBBBS": "2",
  "SBSBBBBSB": "2",
  "BSBBBBSBB": "1",
  "SBBBBSBBB": "1",
  "BBBBBSBBBB": "1",
  "BBBSBBBBS": "2",
  "BBSBBBBSS": "2",
  "BSBBBBSSS": "2",
  "SBBBBSSSS": "1",
  "BBBBSSSSS": "2",
  "BBBSSSSSS": "2",
  "BBSSSSSSS": "2",
  "BSSSSSSSB": "2",
  "SSSSSSSBS": "1",
  "SSSSSSBSB": "2",
  "SSSSSBSBB": "2",
  "SSSSBSBBS": "2",
  "SSSBSBBSS": "2",
  "SSBSBBSSS": "1",
  "SBSBBSSSB": "2",
  "BSBBSSSBB": "1",
  "SBBSSSBBB": "2",
  "BBSSSBBBS": "1",
  "BSSSBBBSB": "2",
  "SSSBBBSBB": "1",
  "SSBBBSBBS": "1",
  "SBBBSBBSS": "2",
  "BBBSBBSSS": "2",
  "BBSBBSSSB": "1",
  "BBSSSBBBB": "1",
  "BSSSBBBBB": "2",
  "SSSBBBBBS": "1",
  "SSBBBBBSS": "2",
  "SBBBBBSSS": "2",
  "BBBBBSSSS": "1",
  "BBBBSSSSB": "2",
  "BBBSSSSBB": "2",
  "BBSSSSBBS": "1",
  "BSSSSBBSS": "1",
  "SSSSBBSSB": "2",
  "SSSBBSSBB": "1",
  "SSBBSSBBS": "1",
  "SBBSSBBSS": "2",
  "BBSSBBSSS": "2",
  "BSSBBSSSS": "2",
  "SSBBSSSSB": "2",
  "SBBSSSSBB": "2",
  "BBSSSSBBB": "2",
  "BSSSSBBBS": "2",
  "SSSSBBBSS": "2",
  "SSSBBBSSS": "1",
  "SSBBBSSSB": "2",
  "SBBBSSSBB": "2",
  "BBBSSSBBS": "2",
  "BBSSSBBSB": "2",
  "BSSSBBSBS": "2",
  "SSSBBSBSB": "1",
  "SSBBSBSBS": "2",
  "SBBSBSBSB": "1",
  "BBSBSBSBB": "1",
  "BSBSBSBBS": "2",
  "SBSBSBBSS": "2",
  "BSBSBBSSB": "2",
  "SBSBBSSBS": "2",
  "BSBBSSBSB": "2",
  "SBBSSBSBB": "2",
  "BBSSBSBBS": "1",
  "BSSBSBBSB": "1",
  "SSBSBBSBS": "2",
  "SBSBBSBSS": "2",
  "BSBBSBSSB": "2",
  "SBBSBSSBS": "1",
  "BBSBSSBSB": "1",
  "BSBSSBSBB": "2",
  "SBSSBSBBS": "2",
  "SSBSBBSBB": "2",
  "SBSBBSBBS": "1",
  "BSBBSBBSS": "2",
  "SBBSBBSSB": "1",
  "BBSBBSSBS": "2",
  "SBBSSBSBS": "1",
  "BBSSBSBSS": "2",
  "BSSBSBSSB": "1",
  "SSBSBSSBS": "1",
  "SBSBSSBSS": "1",
  "BSBSSBSSS": "1",
  "SBSSBSSSS": "2",
  "BSSBSSSSB": "1",
  "SSBSSSSBB": "2",
  "SBSSSSBBS": "2",
  "SSSSBBSSS": "1",
  "SSSBBSSSS": "1",
  "BSSSSBBSB": "1",
  "SSSSBBSBB": "2",
  "SSSBBSBBB": "2",
  "SSBBSBBBS": "1",
  "SBBSBBBSS": "2",
  "BBSBBBSSB": "1",
  "BSBBBSSBB": "1",
  "SBBBSSBBB": "2",
  "BBBSSBBBB": "1",
  "BBSSBBBBS": "1",
  "BSSBBBBSS": "1",
  "SSBBBBSSB": "2",
  "SBBBBSSBB": "1",
  "BBBBSSBBS": "2",
  "BBBSSBBSB": "2",
  "BBSSBBSBB": "1",
  "BSSBBSBBB": "2",
  "SBBSBBBSB": "2",
  "BBSBBBSBS": "2",
  "BSBBBSBSS": "2",
  "SBBBSBSSB": "2",
  "BBBSBSSBB": "2",
  "BBSBSSBBB": "1",
  "BSBSSBBBB": "1",
  "SBSSBBBBS": "1",
  "SSBBBBSSS": "2",
  "BBBSSSSSB": "1",
  "BBSSSSSBS": "2",
  "BSSSSSBSS": "2",
  "SSSSSBSSS": "1",
  "SSSSBSSSB": "2",
  "SSSBSSSBS": "2",
  "SSBSSSBSB": "1",
  "SBSSSBSBS": "1",
  "BSSSBSBSB": "2",
  "SSSBSBSBS": "1",
  "SSBSBSBSS": "1",
  "SBSBSBSSS": "2",
  "BSBSBSSSS": "2",
  "SBSBSSSSB": "2",
  "BSBSSSSBS": "1",
  "SBSSSSBSS": "2",
  "BSSSSBSSB": "1",
  "SSSSBSSBB": "2",
  "SSSBSSBBS": "1",
  "SSBSSBBSS": "1",
  "SBSSBBSSS": "1",
  "SSBBSSSSS": "2",
  "SBBSSSSSS": "2",
  "BSSSSSSSS": "1",
  "SSSSSSSSB": "1",
  "SSSSSSSBB": "1",
  "SSSSSSBBB": "1",
  "SSSSSBBBS": "1",
  "SBBBSSSBS": "1",
  "BBBSSSBSS": "2",
  "BBSSSBSSS": "2",
  "BSSSBSSSS": "1",
  "SSSBSSSSB": "2",
  "SSBSSSSBS": "1",
  "SBSSSSBSB": "1",
  "BSSSSBSBS": "1",
  "SSSSBSBSS": "2",
  "SSSBSBSSB": "2",
  "SSBSBSSBB": "2",
  "SBSBSSBBS": "1",
  "BSBSSBBSS": "2",
  "SBBSSSSSB": "1",
  "BBSSSSSBB": "1",
  "BSSSSSBBB": "2",
  "SSSBBBSSB": "2",
  "SSBBBSSBS": "1",
  "SBBBSSBSB": "2",
  "BBBSSBSBS": "1",
  "SBSBSSBBB": "1",
  "BSBSSBBBS": "2",
  "SBSSBBBSB": "2",
  "BSSBBBSBS": "2",
  "SSBBBSBSS": "2",
  "BBBSBSSBS": "1",
  "SBSSBSBBB": "2",
  "BSSBSBBBB": "1",
  "SSBSBBBBS": "1",
  "SBSBBBBSS": "1",
  "BSBBBBSSB": "2",
  "SBBBBSSBS": "1",
  "BBBBSSBSS": "2",
  "BBBSSBSSS": "1",
  "BBSSBSSSB": "1",
  "BSSBSSSBB": "2",
  "SSBSSSBBS": "1",
  "SBSSSBBSB": "2",
  "SSSBBSBSS": "1",
  "SSBBSBSSS": "2",
  "SBBSBSSSB": "2",
  "BBSBSSSBS": "2",
  "BSBSSSBSB": "2",
  "SBSSSBSBB": "2",
  "BSSSBSBBS": "2",
  "SSSBSBBSB": "1",
  "SBSBBSBBB": "2",
  "BSBBSBBBB": "1",
  "SBBSBBBBS": "1",
  "BBBSSBSSB": "2",
  "BBSSBSSBS": "2",
  "BSSBSSBSB": "2",
  "SSBSSBSBB": "2",
  "BSSBSBBBS": "2",
  "SSBSBBBSB": "2",
  "SBSBBBSBS": "2",
  "SBSSBBBBB": "2",
  "BSSBBBBBB": "2",
  "SSBBBBBBS": "1",
  "SBBBBBBSS": "2",
  "BBBBBBSSB": "2",
  "BBBBBSSBB": "1",
  "BBBBSSBBB": "1",
  "BBSSBBBBB": "1",
  "BBBBBBSSS": "1",
  "BBBBBSSSB": "2",
  "BBBBSSSBS": "2",
  "BBBSSSBSB": "2",
  "BBSSSBSBB": "1",
  "BSSSBSBBB": "2",
  "SSSBSBBBB": "1",
  "SSBSBBBBB": "1",
  "SBSBBBBBS": "2",
  "BSBBBBBSS": "2",
  "SBBBBBSSB": "1",
  "BBBBBSSBS": "1",
  "BBBBSSBSB": "2",
  "BBBSSBSBB": "2",
  "BBSSBSBBB": "1",
  "SSBSBBBSS": "1",
  "SBSBBBSSS": "1",
  "BSBBBSSSB": "1",
  "BSSSSBSSS": "1",
  "SSSSBSSSS": "2",
  "SSSBSSSSS": "1",
  "SSBSSSSSS": "2",
  "SBSSSSSSB": "1",
  "BSSSSSSBS": "2",
  "SSSSBSBBB": "2",
  "SSSBSBBBS": "2",
  "SBSBBBSSB": "2",
  "BSSBBBBBS": "1",
  "BBBBSSSBB": "2",
  "BBBSSSBBB": "1",
  "SSSBBBBBB": "2",
  "SBBBBBBSB": "2",
  "BBBBBBSBB": "2",
  "BBBBBSBBB": "1",
  "BBBBSBBBB": "1",
  "BBBSBBBBB": "1",
  "BBSBBBBBB": "1",
  "BSBBBBBBB": "1",
  "SBBBBBBBS": "2",
  "BBBBBBBSS": "1",
  "BBBSSBBBS": "1",
  "BBSSBBBSB": "1",
  "SSBBBSBSB": "2",
  "SBBBSBSBB": "1",
  "BBBSBSBBB": "1",
  "BBSBSBBBS": "2",
  "BSBSBBBSB": "2",
  "SBSBBBSBB": "2",
  "BSBBBSBBS": "1",
  "SBBBSBBSB": "2",
  "BBBSBBSBS": "2",
  "BBSBBSBSS": "2",
  "BSBBSBSSS": "1",
  "BBSBSSSBB": "1",
  "BSBSSSBBS": "1",
  "SBSSSBBSS": "2",
  "BSSSBBSSB": "1",
  "SBBSSBBSB": "2",
  "BBSBBBSSS": "2",
  "BBSSSBSBS": "2",
  "BSSSBSBSS": "2",
  "SSSBSBSSS": "1",
  "SSBSBSSSS": "2",
  "BSBSSSSBB": "2",
  "SSSBBSSBS": "1",
  "SSBBSSBSB": "2",
  "SSSSSSSSS": "2",
  "SSSSSSBBS": "2",
  "SSSSSBBSB": "1",
  "SSSSBBSBS": "2",
  "SSBBSBSBB": "2",
  "SBBSBSBBB": "1",
  "BSBSBBBSS": "1",
  "BSBBBSSBS": "1",
  "BSSBSBSSS": "1",
  "SSBSBSSSB": "2",
  "SBSBSSSBB": "1",
  "BSSSBBSSS": "1",
  "SSSBBSSSB": "2",
  "SSBBSSSBS": "1",
  "SBBSSSBSS": "2",
  "BBSSSBSSB": "1",
  "BSSSBSSBB": "1",
  "SBSSBBSSB": "2",
  "BSSBBSSBB": "1",
  "SSBBSSBBB": "2",
  "SBBSSBBBB": "1",
  "SSBBBBBBB": "1",
  "BBBBBBBSB": "1",
  "BBBBBSBBS": "1",
  "BBBBSBBSS": "2",
  "BSBBSSSBS": "2",
  "SSSBSSBBB": "2",
  "SSBSSBBBS": "1",
  "SBBBSBSBS": "1",
  "BBBSBSBSS": "2",
  "BBSBSBSSB": "1",
  "BSBSBSSBB": "2",
  "BSSBSBBSS": "2",
  "SSBSBBSSB": "1",
  "SBSBBSSBB": "2",
  "BSBBSSBBB": "1",
  "SBBSSBBBS": "2",
  "BSSBBBSBB": "2",
  "SSBBBSBBB": "1",
  "SBBBSBBBS": "2",
  "BBBSBBBSB": "1",
  "BBSBSSBBS": "1",
  "BSBSSBBSB": "2",
  "SBSSBBSBB": "1",
  "BSSBBSBBS": "2",
  "SSBBSBBSS": "1",
  "SBBSBBSSS": "2",
  "SSSSSSBSS": "1",
  "BBSBSSBSS": "2",
  "BSBSSBSSB": "1",
  "SBSSBSSBS": "2",
  "BSBBBBBSB": "2",
  "SBBBBBSBB": "1",
  "SBBBBBBBB": "1",
  "BBBBBBBBS": "1",
  "BSSSBSSSB": "1",
  "BSBBBBSBS": "2",
  "SBBBBSBSS": "1",
  "SBSSSSSBB": "2",
  "BSSSSSBBS": "1",
  "SSSSSBBSS": "2",
  "BBSSBBSSB": "1",
  "BSSBBSSBS": "1",
  "SBSBBSBSB": "2",
  "BSBSBBSBB": "1",
  "BSBBSBBSB": "1",
  "SBBSBBSBS": "2",
  "BBSBSBBSB": "1",
  "BSBSBBSBS": "1",
  "BSBBSBSBS": "1",
  "SBBSBSBSS": "1",
  "BBSBSBSSS": "2",
  "SSSSBSSBS": "1",
  "SSSBSSBSB": "2",
  "SBBBBSBBS": "1",
  "BBSBBSSSS": "2",
  "BSBBSSSSB": "1",
  "SBBSSSSBS": "1",
  "BBSSSSBSB": "1",
  "BSSSSBSBB": "2",
  "SBBSBSSSS": "2",
  "BBSBSSSSB": "1",
  "SSSBSSSBB": "2",
  "SBBSSSBSB": "2",
  "BSBBBSSSS": "1",
  "SBBBSSSSS": "1",
  "SSSSSBSBS": "2",
  "BBSSBSBSB": "1",
  "BSSBSBSBB": "2",
  "SSBSBSBBB": "2",
  "SBSBSBBBS": "1",
  "BBSSBBBSS": "2",
  "BSSBBBSSB": "1",
  "SSBBBSSBB": "2",
  "SBBBSSBBS": "1",
  "BSBSBBSSS": "1",
  "BBSSSBBSS": "2",
  "SBBBSBSSS": "2",
  "BBBSBSSSB": "1",
  "BSBSBSSBS": "1",
  "SBSBSSBSB": "1",
  "BBSBSBSBS": "2",
  "BSBSBSBSB": "2",
  "SBSBSBSBS": "2",
  "BSBSBSSSB": "1",
  "SBSBSSSBS": "1",
  "BSBSSBSBS": "2",
  "SBSSBSBSS": "1",
  "SBBBBBSBS": "1",
  "BBBBBSBSB": "1",
  "BBBBSBSBS": "1",
  "BSBSSSBBB": "1",
  "SBSSSBBBS": "1",
  "BSSSBBBSS": "1",
  "SBSBSSSSS": "2",
  "BSBBBSBBB": "1",
  "BBSBBBSBB": "2",
  "BBBSBBSBB": "1",
  "BBSBBSBBS": "1",
  "BBBSBBBSS": "2",
  "SBSSSSBBB": "1",
  "BBSBSBBBB": "1",
  "SSBBSBBBB": "2",
  "SBBSBBBBB": "1",
  "BBSBBBBBS": "2",
  "BSBBSSBSS": "2",
  "SBBSSBSSB": "1",
  "BBSSBSSBB": "1",
  "BSSBSSBBB": "1",
  "SSBSSBBBB": "2",
  "BSSBBBBSB": "1",
  "SSBBBBSBS": "2",
  "BBBBSBSSS": "1",
  "BBBSSBBSS": "1",
  "SSBBSSBSS": "2",
  "SBBSSBSSS": "1",
  "BBSSBSSSS": "2",
  "BSSSSBBBB": "1",
  "SSSSBBBBS": "1",
  "SSSBBBBSB": "2",
  "SSBBBBSBB": "1",
  "BSBBSBSBB": "2",
  "BSBBBBBBS": "2",
  "SSBSSBBSB": "2",
  "SBSSBBSBS": "2",
  "SSSSBBBBB": "2",
  "SSBBBBBSB": "2",
  "SBBSBBSBB": "2",
  "BBSBBSBBB": "1",
  "SSBSBSBBS": "2",
  "SBSBBSSSS": "2",
  "BSBBSSSSS": "2",
  "BBSSSSSSB": "2",
  "BSSSSSSBB": "1",
  "SSBSSSBSS": "1",
  "SBSSSBSSB": "2",
  "BSSSBSSBS": "1",
  "SSBSSBSBS": "1",
  "BSSSBBSBB": "1",
  "SSSBBSBBS": "1",
  "BBSBSSSSS": "1",
  "SBSSBSBSB": "2",
  "BSSBSBSBS": "1",
  "SSBSBSBSB": "1",
  "SSSSBSBSB": "2",
  "SBBBSSSSB": "2",
  "SSSSSBBBB": "2",
  "SSSBBBBSS": "2",
  "SBSSBBBSS": "1",
  "BSSBBBSSS": "2",
  "SBSSSSSSS": "1",
  "SSBBBSSSS": "1",
  "BBBBSBSSB": "2",
  "BSSBSSBSS": "2",
  "SSBSSBSSS": "1",
  "SBSSBSSSB": "2",
  "BSSBSSSBS": "2",
  "BBBSSSSBS": "1",
  "BSSSSSBSB": "1",
  "SBSBSBSBB": "2",
  "SBBBBSSSB": "2",
  "SSBBSBSSB": "2",
  "BBSBBSSBB": "1",
  "BSBBBSBSB": "1",
  "SBSBSBSSB": "2",
  "BSBSBSBBB": "2",
  "BSBSBBBBB": "2",
  "BBBBBBBBB": "2",
  "BBBSBBSSB": "1",
  "BBBSBSBBS": "2",
  "BSBSSSSSS": "1",
  "SBBSBSSBB": "2",
  "BSBSSSSSB": "1",
  "SBSSSSSBS": "2",
  "SSSBSBSBB": "2",
  "SBSBSBBSB": "1",
  "BBBBBBSBS": "2",
  "BBBSBSBSB": "2",
  "SSSSSBSSB": "1",
  "BBBBBSBSS": "2",
  "BBBBSBBBS": "2",
  "BBBBSBBSB": "1",
  "BBBBSBSBB": "1",
  "BBBSBSSSS": "1",
  "BBSBBBBSB": "1",
  "BBSBBSBSB": "2",
  "BBSBSBBSS": "2",
  "BBSSBBSBS": "2",
  "BBSSSSBSS": "2",
  "BSBBSBBBS": "1",
  "BSBBSSBBS": "1",
  "BSBSBSBSS": "2",
  "BSBSSSBSS": "1",
  "BSSBBSBSB": "2",
  "BSSBBSBSS": "2",
  "BSSBBSSSB": "2",
  "BSSBSSBBS": "1",
  "BSSBSSSSS": "2",
  "BSSSBBBBS": "1",
  "SBBBBSBSB": "2",
  "SBBBSBBBB": "2",
  "SBBBSSBSS": "1",
  "SBBSBSBBS": "2",
  "SBBSSSBBS": "1",
  "SBSBBBBBB": "2",
  "SBSBSBBBB": "2",
  "SBSSBSSBB": "2",
  "SBSSSBBBB": "2",
  "SBSSSBSSS": "1",
  "SSBBSBBSB": "2",
  "SSBBSSSBB": "2",
  "SSBSSBSSB": "1",
  "SSBSSSBBB": "2",
  "SSBSSSSSB": "2",
  "SSSBBBSBS": "1",
  "SSSBSSBSS": "1",
  "SSSSBBBSB": "2",
  "BBSBBSSS": "1",
  "BBBBBSSS": "1",
  "BBSSBSSS": "2",
  "BSBSBSSS": "2",
  "BSSSBSSS": "2",
  "SBBBBSBB": "1",
  "SBBBSBSB": "1",
  "SBBBSBSS": "2",
  "SBBSBSSS": "2",
  "SBSSBSSS": "2",
  "SSBSBSSS": "2",
  "SSSSBSSS": "2",
  "SSSSSBBS": "1",
  "BBSBBBSB": "2",
  "BBSBBBSS": "1",
  "BBSBBSBB": "2",
  "BBSBSBSB": "2",
  "BBSBSSBB": "1",
  "BBSBSSSS": "2",
  "BBSSBBSB": "1",
  "BBSSBBSS": "2",
  "BBSSBSBB": "1",
  "BBSSSBSB": "1",
  "BBSSSSBB": "2",
  "BBSSSSSS": "1",
  "BSBBBBSB": "2",
  "BSBBBSS": "1",
  "BSBBSBB": "2",
  "BSBBSSS": "1",
  "BSBSBSB": "2",
  "BSBSSBB": "1",
  "BSBSSSS": "2",
  "BSSBBBSB": "1",
  "BSSBBSS": "2",
  "BSSBSBB": "1",
  "BSSBSSS": "2",
  "BSSSBSB": "1",
  "BSSSSBB": "2",
  "BSSSSSS": "1",
  "SBBBBBSB": "2",
  "SBBBBSS": "1",
  "SBBBSBB": "2",
  "SBBBSSS": "1",
  "SBBSBSB": "2",
  "SBBSSBB": "1",
  "SBBSSSS": "2",
  "SBSBBBSB": "1",
  "SBSBBSS": "2",
  "SBSBSBB": "1",
  "SBSBSSS": "2",
  "SBSSBSB": "1",
  "SBSSSSBB": "2",
  "SBSSSSSS": "1",
  "SSBBBBSB": "2",
  "SSBBBSS": "1",
  "SSBBSBB": "2",
  "SSBBSSS": "1",
  "SSBSBSB": "2",
  "SSBSSBB": "1",
  "SSBSSSS": "2",
  "SSSBBBSB": "1",
  "SSSBBSS": "2",
  "SSSBSBB": "1",
  "SSSBSSS": "2",
  "SSSSBSB": "1",
  "SSSSSSBB": "2",
  "SSSSSSSS": "1",
  "BBBSBSBB": "1",
  "BBBSBSSS": "2",
  "BBBSSBGSB": "2",
  "BBSSBGSBS": "1",
  "BSSBGSBSB": "2",
  "SSBGSBSBB": "1",
  "SBGSBSBBS": "2",
  "BBSGSBBSS": "1",
  "BBSSBGSBB": "2",
  "BSSBGSBSS": "2",
  "SSBBSBGSB": "1",
  "BBBBSBGSB": "2"
};

export const CLEAN_500_PATTERNS: Pattern500Entry[] = [
  {
    "id": "001",
    "name": "001_ZIGZAG",
    "seq": "SBSBSBSB",
    "target": "SMALL",
    "category": "ZIGZAG"
  },
  {
    "id": "002",
    "name": "002_ZIGZAG",
    "seq": "BSBSBSBS",
    "target": "BIG",
    "category": "ZIGZAG"
  },
  {
    "id": "003",
    "name": "003_ZIGZAG",
    "seq": "SBSBSBSBSBS",
    "target": "BIG",
    "category": "ZIGZAG"
  },
  {
    "id": "004",
    "name": "004_ZIGZAG",
    "seq": "SBSSBSBSBSB",
    "target": "SMALL",
    "category": "ZIGZAG"
  },
  {
    "id": "005",
    "name": "005_ZIGZAG",
    "seq": "SBSBSBSBS",
    "target": "SMALL",
    "category": "ZIGZAG"
  },
  {
    "id": "006",
    "name": "006_ZIGZAG",
    "seq": "BSBSBSBSB",
    "target": "SMALL",
    "category": "ZIGZAG"
  },
  {
    "id": "007",
    "name": "007_REVERSE_ZIGZAG",
    "seq": "BSBSBSBS",
    "target": "BIG",
    "category": "REVERSE_ZIGZAG"
  },
  {
    "id": "008",
    "name": "008_REVERSE_ZIGZAG",
    "seq": "SBSBSBSB",
    "target": "SMALL",
    "category": "REVERSE_ZIGZAG"
  },
  {
    "id": "009",
    "name": "009_REVERSE_ZIGZAG",
    "seq": "BSBSBSBSBSB",
    "target": "SMALL",
    "category": "REVERSE_ZIGZAG"
  },
  {
    "id": "010",
    "name": "010_REVERSE_ZIGZAG",
    "seq": "BSBBSBSBSBS",
    "target": "SMALL",
    "category": "REVERSE_ZIGZAG"
  },
  {
    "id": "011",
    "name": "011_REVERSE_ZIGZAG",
    "seq": "BSBSBSBSB",
    "target": "SMALL",
    "category": "REVERSE_ZIGZAG"
  },
  {
    "id": "012",
    "name": "012_REVERSE_ZIGZAG",
    "seq": "SBSBSBSBS",
    "target": "SMALL",
    "category": "REVERSE_ZIGZAG"
  },
  {
    "id": "013",
    "name": "013_REVERSAL",
    "seq": "SSBBSBBS",
    "target": "BIG",
    "category": "REVERSAL"
  },
  {
    "id": "014",
    "name": "014_REVERSAL",
    "seq": "SBBSBBSS",
    "target": "BIG",
    "category": "REVERSAL"
  },
  {
    "id": "015",
    "name": "015_REVERSAL",
    "seq": "BBSBBSSS",
    "target": "BIG",
    "category": "REVERSAL"
  },
  {
    "id": "016",
    "name": "016_REVERSAL",
    "seq": "SSBBSBBSSSB",
    "target": "BIG",
    "category": "REVERSAL"
  },
  {
    "id": "017",
    "name": "017_REVERSAL",
    "seq": "SSBSSBBSBBS",
    "target": "SMALL",
    "category": "REVERSAL"
  },
  {
    "id": "018",
    "name": "018_REVERSAL",
    "seq": "SSBBSBBSBSS",
    "target": "SMALL",
    "category": "REVERSAL"
  },
  {
    "id": "019",
    "name": "019_REVERSAL",
    "seq": "BSSSSBBSBBS",
    "target": "BIG",
    "category": "REVERSAL"
  },
  {
    "id": "020",
    "name": "020_REVERSAL",
    "seq": "SSBBSBBSB",
    "target": "SMALL",
    "category": "REVERSAL"
  },
  {
    "id": "021",
    "name": "021_REVERSAL",
    "seq": "BSSBBSBBS",
    "target": "SMALL",
    "category": "REVERSAL"
  },
  {
    "id": "022",
    "name": "022_REVERSE_REVERSAL",
    "seq": "BBSSBSSB",
    "target": "SMALL",
    "category": "REVERSE_REVERSAL"
  },
  {
    "id": "023",
    "name": "023_REVERSE_REVERSAL",
    "seq": "BSSBSSBB",
    "target": "BIG",
    "category": "REVERSE_REVERSAL"
  },
  {
    "id": "024",
    "name": "024_REVERSE_REVERSAL",
    "seq": "SSBSSBBB",
    "target": "SMALL",
    "category": "REVERSE_REVERSAL"
  },
  {
    "id": "025",
    "name": "025_REVERSE_REVERSAL",
    "seq": "BBSSBSSBBBS",
    "target": "BIG",
    "category": "REVERSE_REVERSAL"
  },
  {
    "id": "026",
    "name": "026_REVERSE_REVERSAL",
    "seq": "BBSBBSSBSSB",
    "target": "BIG",
    "category": "REVERSE_REVERSAL"
  },
  {
    "id": "027",
    "name": "027_REVERSE_REVERSAL",
    "seq": "BBSSBSSBSBB",
    "target": "SMALL",
    "category": "REVERSE_REVERSAL"
  },
  {
    "id": "028",
    "name": "028_REVERSE_REVERSAL",
    "seq": "SBBBBSSBSSB",
    "target": "SMALL",
    "category": "REVERSE_REVERSAL"
  },
  {
    "id": "029",
    "name": "029_REVERSE_REVERSAL",
    "seq": "BBSSBSSBS",
    "target": "SMALL",
    "category": "REVERSE_REVERSAL"
  },
  {
    "id": "030",
    "name": "030_REVERSE_REVERSAL",
    "seq": "SBBSSBSSB",
    "target": "BIG",
    "category": "REVERSE_REVERSAL"
  },
  {
    "id": "031",
    "name": "031_WAVE",
    "seq": "SSBBSSBB",
    "target": "BIG",
    "category": "WAVE"
  },
  {
    "id": "032",
    "name": "032_WAVE",
    "seq": "BBSSBBSS",
    "target": "SMALL",
    "category": "WAVE"
  },
  {
    "id": "033",
    "name": "033_WAVE",
    "seq": "SBBSSBBS",
    "target": "SMALL",
    "category": "WAVE"
  },
  {
    "id": "034",
    "name": "034_WAVE",
    "seq": "SSBBSSBBSSB",
    "target": "BIG",
    "category": "WAVE"
  },
  {
    "id": "035",
    "name": "035_WAVE",
    "seq": "SSBSSBBSSBB",
    "target": "BIG",
    "category": "WAVE"
  },
  {
    "id": "036",
    "name": "036_WAVE",
    "seq": "SSBBSSBBBSS",
    "target": "SMALL",
    "category": "WAVE"
  },
  {
    "id": "037",
    "name": "037_WAVE",
    "seq": "BSSSSBBSSBB",
    "target": "BIG",
    "category": "WAVE"
  },
  {
    "id": "038",
    "name": "038_WAVE",
    "seq": "SSBBSSBBS",
    "target": "BIG",
    "category": "WAVE"
  },
  {
    "id": "039",
    "name": "039_WAVE",
    "seq": "BSSBBSSBB",
    "target": "BIG",
    "category": "WAVE"
  },
  {
    "id": "040",
    "name": "040_REVERSE_WAVE",
    "seq": "BBSSBBSS",
    "target": "SMALL",
    "category": "REVERSE_WAVE"
  },
  {
    "id": "041",
    "name": "041_REVERSE_WAVE",
    "seq": "SSBBSSBB",
    "target": "BIG",
    "category": "REVERSE_WAVE"
  },
  {
    "id": "042",
    "name": "042_REVERSE_WAVE",
    "seq": "BSSBBSSB",
    "target": "BIG",
    "category": "REVERSE_WAVE"
  },
  {
    "id": "043",
    "name": "043_REVERSE_WAVE",
    "seq": "BBSSBBSSBBS",
    "target": "BIG",
    "category": "REVERSE_WAVE"
  },
  {
    "id": "044",
    "name": "044_REVERSE_WAVE",
    "seq": "BBSBBSSBBSS",
    "target": "SMALL",
    "category": "REVERSE_WAVE"
  },
  {
    "id": "045",
    "name": "045_REVERSE_WAVE",
    "seq": "BBSSBBSSSBB",
    "target": "SMALL",
    "category": "REVERSE_WAVE"
  },
  {
    "id": "046",
    "name": "046_REVERSE_WAVE",
    "seq": "SBBBBSSBBSS",
    "target": "BIG",
    "category": "REVERSE_WAVE"
  },
  {
    "id": "047",
    "name": "047_REVERSE_WAVE",
    "seq": "BBSSBBSSB",
    "target": "BIG",
    "category": "REVERSE_WAVE"
  },
  {
    "id": "048",
    "name": "048_REVERSE_WAVE",
    "seq": "SBBSSBBSS",
    "target": "SMALL",
    "category": "REVERSE_WAVE"
  },
  {
    "id": "049",
    "name": "049_STAIR_UP",
    "seq": "SSBBBSSBBB",
    "target": "SMALL",
    "category": "STAIR_UP"
  },
  {
    "id": "050",
    "name": "050_STAIR_UP",
    "seq": "BBBSSBBBSS",
    "target": "SMALL",
    "category": "STAIR_UP"
  },
  {
    "id": "051",
    "name": "051_STAIR_UP",
    "seq": "SBBBSSBBBS",
    "target": "BIG",
    "category": "STAIR_UP"
  },
  {
    "id": "052",
    "name": "052_STAIR_UP",
    "seq": "SSBBBSSBBBSSB",
    "target": "BIG",
    "category": "STAIR_UP"
  },
  {
    "id": "053",
    "name": "053_STAIR_UP",
    "seq": "SSBSSBBBSSBBB",
    "target": "SMALL",
    "category": "STAIR_UP"
  },
  {
    "id": "054",
    "name": "054_STAIR_UP",
    "seq": "SSBBBSSBBBBSS",
    "target": "BIG",
    "category": "STAIR_UP"
  },
  {
    "id": "055",
    "name": "055_STAIR_UP",
    "seq": "BSSSSBBBSSBBB",
    "target": "SMALL",
    "category": "STAIR_UP"
  },
  {
    "id": "056",
    "name": "056_STAIR_UP",
    "seq": "SSBBBSSBBBS",
    "target": "BIG",
    "category": "STAIR_UP"
  },
  {
    "id": "057",
    "name": "057_STAIR_UP",
    "seq": "BSSBBBSSBBB",
    "target": "SMALL",
    "category": "STAIR_UP"
  },
  {
    "id": "058",
    "name": "058_STAIR_DOWN",
    "seq": "BBSSSBBSSS",
    "target": "BIG",
    "category": "STAIR_DOWN"
  },
  {
    "id": "059",
    "name": "059_STAIR_DOWN",
    "seq": "SSSBBSSSBB",
    "target": "SMALL",
    "category": "STAIR_DOWN"
  },
  {
    "id": "060",
    "name": "060_STAIR_DOWN",
    "seq": "BSSSBBSSSB",
    "target": "SMALL",
    "category": "STAIR_DOWN"
  },
  {
    "id": "061",
    "name": "061_STAIR_DOWN",
    "seq": "BBSSSBBSSSBBS",
    "target": "BIG",
    "category": "STAIR_DOWN"
  },
  {
    "id": "062",
    "name": "062_STAIR_DOWN",
    "seq": "BBSBBSSSBBSSS",
    "target": "BIG",
    "category": "STAIR_DOWN"
  },
  {
    "id": "063",
    "name": "063_STAIR_DOWN",
    "seq": "BBSSSBBSSSSBB",
    "target": "SMALL",
    "category": "STAIR_DOWN"
  },
  {
    "id": "064",
    "name": "064_STAIR_DOWN",
    "seq": "SBBBBSSSBBSSS",
    "target": "BIG",
    "category": "STAIR_DOWN"
  },
  {
    "id": "065",
    "name": "065_STAIR_DOWN",
    "seq": "BBSSSBBSSSB",
    "target": "SMALL",
    "category": "STAIR_DOWN"
  },
  {
    "id": "066",
    "name": "066_STAIR_DOWN",
    "seq": "SBBSSSBBSSS",
    "target": "BIG",
    "category": "STAIR_DOWN"
  },
  {
    "id": "067",
    "name": "067_MIRROR",
    "seq": "SBBSSBBS",
    "target": "BIG",
    "category": "MIRROR"
  },
  {
    "id": "068",
    "name": "068_MIRROR",
    "seq": "BBSSBBSS",
    "target": "SMALL",
    "category": "MIRROR"
  },
  {
    "id": "069",
    "name": "069_MIRROR",
    "seq": "BSSBBSSB",
    "target": "SMALL",
    "category": "MIRROR"
  },
  {
    "id": "070",
    "name": "070_MIRROR",
    "seq": "SBBSSBBSSBB",
    "target": "BIG",
    "category": "MIRROR"
  },
  {
    "id": "071",
    "name": "071_MIRROR",
    "seq": "SBBSBBSSBBS",
    "target": "BIG",
    "category": "MIRROR"
  },
  {
    "id": "072",
    "name": "072_MIRROR",
    "seq": "SBBSSBBSBBS",
    "target": "SMALL",
    "category": "MIRROR"
  },
  {
    "id": "073",
    "name": "073_MIRROR",
    "seq": "BBSSBBSSBBS",
    "target": "BIG",
    "category": "MIRROR"
  },
  {
    "id": "074",
    "name": "074_MIRROR",
    "seq": "SBBSSBBSB",
    "target": "SMALL",
    "category": "MIRROR"
  },
  {
    "id": "075",
    "name": "075_MIRROR",
    "seq": "BSBBSSBBS",
    "target": "BIG",
    "category": "MIRROR"
  },
  {
    "id": "076",
    "name": "076_REVERSE_MIRROR",
    "seq": "BSSBBSSB",
    "target": "SMALL",
    "category": "REVERSE_MIRROR"
  },
  {
    "id": "077",
    "name": "077_REVERSE_MIRROR",
    "seq": "SSBBSSBB",
    "target": "BIG",
    "category": "REVERSE_MIRROR"
  },
  {
    "id": "078",
    "name": "078_REVERSE_MIRROR",
    "seq": "SBBSSBBS",
    "target": "BIG",
    "category": "REVERSE_MIRROR"
  },
  {
    "id": "079",
    "name": "079_REVERSE_MIRROR",
    "seq": "BSSBBSSBBSS",
    "target": "SMALL",
    "category": "REVERSE_MIRROR"
  },
  {
    "id": "080",
    "name": "080_REVERSE_MIRROR",
    "seq": "BSSBSSBBSSB",
    "target": "SMALL",
    "category": "REVERSE_MIRROR"
  },
  {
    "id": "081",
    "name": "081_REVERSE_MIRROR",
    "seq": "BSSBBSSBSSB",
    "target": "BIG",
    "category": "REVERSE_MIRROR"
  },
  {
    "id": "082",
    "name": "082_REVERSE_MIRROR",
    "seq": "SSBBSSBBSSB",
    "target": "BIG",
    "category": "REVERSE_MIRROR"
  },
  {
    "id": "083",
    "name": "083_REVERSE_MIRROR",
    "seq": "BSSBBSSBS",
    "target": "BIG",
    "category": "REVERSE_MIRROR"
  },
  {
    "id": "084",
    "name": "084_REVERSE_MIRROR",
    "seq": "SBSSBBSSB",
    "target": "SMALL",
    "category": "REVERSE_MIRROR"
  },
  {
    "id": "085",
    "name": "085_PALINDROME",
    "seq": "SBBSBBS",
    "target": "BIG",
    "category": "PALINDROME"
  },
  {
    "id": "086",
    "name": "086_PALINDROME",
    "seq": "BBSBBSS",
    "target": "BIG",
    "category": "PALINDROME"
  },
  {
    "id": "087",
    "name": "087_PALINDROME",
    "seq": "BSBBSSB",
    "target": "SMALL",
    "category": "PALINDROME"
  },
  {
    "id": "088",
    "name": "088_PALINDROME",
    "seq": "SBBSBBSSBB",
    "target": "BIG",
    "category": "PALINDROME"
  },
  {
    "id": "089",
    "name": "089_PALINDROME",
    "seq": "SBBSBBSBBS",
    "target": "BIG",
    "category": "PALINDROME"
  },
  {
    "id": "090",
    "name": "090_PALINDROME",
    "seq": "BBSSBBSBBS",
    "target": "SMALL",
    "category": "PALINDROME"
  },
  {
    "id": "091",
    "name": "091_PALINDROME",
    "seq": "SBBSBBSB",
    "target": "SMALL",
    "category": "PALINDROME"
  },
  {
    "id": "092",
    "name": "092_PALINDROME",
    "seq": "BSBBSBBS",
    "target": "BIG",
    "category": "PALINDROME"
  },
  {
    "id": "093",
    "name": "093_REVERSE_PALINDROME",
    "seq": "BSSBSSB",
    "target": "SMALL",
    "category": "REVERSE_PALINDROME"
  },
  {
    "id": "094",
    "name": "094_REVERSE_PALINDROME",
    "seq": "SSBSSBB",
    "target": "BIG",
    "category": "REVERSE_PALINDROME"
  },
  {
    "id": "095",
    "name": "095_REVERSE_PALINDROME",
    "seq": "SBSSBBS",
    "target": "BIG",
    "category": "REVERSE_PALINDROME"
  },
  {
    "id": "096",
    "name": "096_REVERSE_PALINDROME",
    "seq": "BSSBSSBBSS",
    "target": "BIG",
    "category": "REVERSE_PALINDROME"
  },
  {
    "id": "097",
    "name": "097_REVERSE_PALINDROME",
    "seq": "BSSBSSBSSB",
    "target": "BIG",
    "category": "REVERSE_PALINDROME"
  },
  {
    "id": "098",
    "name": "098_REVERSE_PALINDROME",
    "seq": "SSBBSSBSSB",
    "target": "BIG",
    "category": "REVERSE_PALINDROME"
  },
  {
    "id": "099",
    "name": "099_REVERSE_PALINDROME",
    "seq": "BSSBSSBS",
    "target": "BIG",
    "category": "REVERSE_PALINDROME"
  },
  {
    "id": "100",
    "name": "100_REVERSE_PALINDROME",
    "seq": "SBSSBSSB",
    "target": "SMALL",
    "category": "REVERSE_PALINDROME"
  },
  {
    "id": "101",
    "name": "101_BIG_STREAK",
    "seq": "BBBBB",
    "target": "BIG",
    "category": "BIG_STREAK"
  },
  {
    "id": "102",
    "name": "102_BIG_STREAK",
    "seq": "BBBBBBBB",
    "target": "BIG",
    "category": "BIG_STREAK"
  },
  {
    "id": "103",
    "name": "103_BIG_STREAK",
    "seq": "BBBBBS",
    "target": "BIG",
    "category": "BIG_STREAK"
  },
  {
    "id": "104",
    "name": "104_BIG_STREAK",
    "seq": "SBBBBB",
    "target": "BIG",
    "category": "BIG_STREAK"
  },
  {
    "id": "105",
    "name": "105_SMALL_STREAK",
    "seq": "SSSSS",
    "target": "SMALL",
    "category": "SMALL_STREAK"
  },
  {
    "id": "106",
    "name": "106_SMALL_STREAK",
    "seq": "SSSSSSSS",
    "target": "BIG",
    "category": "SMALL_STREAK"
  },
  {
    "id": "107",
    "name": "107_SMALL_STREAK",
    "seq": "SSSSSB",
    "target": "SMALL",
    "category": "SMALL_STREAK"
  },
  {
    "id": "108",
    "name": "108_SMALL_STREAK",
    "seq": "BSSSSS",
    "target": "SMALL",
    "category": "SMALL_STREAK"
  },
  {
    "id": "109",
    "name": "109_STREAK_BREAK",
    "seq": "BBBSBB",
    "target": "SMALL",
    "category": "STREAK_BREAK"
  },
  {
    "id": "110",
    "name": "110_STREAK_BREAK",
    "seq": "BBSBBB",
    "target": "SMALL",
    "category": "STREAK_BREAK"
  },
  {
    "id": "111",
    "name": "111_STREAK_BREAK",
    "seq": "BSBBBB",
    "target": "SMALL",
    "category": "STREAK_BREAK"
  },
  {
    "id": "112",
    "name": "112_STREAK_BREAK",
    "seq": "BBBSBBBBB",
    "target": "BIG",
    "category": "STREAK_BREAK"
  },
  {
    "id": "113",
    "name": "113_STREAK_BREAK",
    "seq": "BBBBBBSBB",
    "target": "SMALL",
    "category": "STREAK_BREAK"
  },
  {
    "id": "114",
    "name": "114_STREAK_BREAK",
    "seq": "BBBSBBS",
    "target": "BIG",
    "category": "STREAK_BREAK"
  },
  {
    "id": "115",
    "name": "115_STREAK_BREAK",
    "seq": "SBBBSBB",
    "target": "SMALL",
    "category": "STREAK_BREAK"
  },
  {
    "id": "116",
    "name": "116_REVERSE_STREAK_BREAK",
    "seq": "SSSBSS",
    "target": "BIG",
    "category": "REVERSE_STREAK_BREAK"
  },
  {
    "id": "117",
    "name": "117_REVERSE_STREAK_BREAK",
    "seq": "SSBSSS",
    "target": "BIG",
    "category": "REVERSE_STREAK_BREAK"
  },
  {
    "id": "118",
    "name": "118_REVERSE_STREAK_BREAK",
    "seq": "SBSSSS",
    "target": "BIG",
    "category": "REVERSE_STREAK_BREAK"
  },
  {
    "id": "119",
    "name": "119_REVERSE_STREAK_BREAK",
    "seq": "SSSBSSSSS",
    "target": "BIG",
    "category": "REVERSE_STREAK_BREAK"
  },
  {
    "id": "120",
    "name": "120_REVERSE_STREAK_BREAK",
    "seq": "SSSSSSBSS",
    "target": "BIG",
    "category": "REVERSE_STREAK_BREAK"
  },
  {
    "id": "121",
    "name": "121_REVERSE_STREAK_BREAK",
    "seq": "SSSBSSB",
    "target": "SMALL",
    "category": "REVERSE_STREAK_BREAK"
  },
  {
    "id": "122",
    "name": "122_REVERSE_STREAK_BREAK",
    "seq": "BSSSBSS",
    "target": "BIG",
    "category": "REVERSE_STREAK_BREAK"
  },
  {
    "id": "123",
    "name": "123_DOUBLE_SWITCH",
    "seq": "SSBBSBBS",
    "target": "BIG",
    "category": "DOUBLE_SWITCH"
  },
  {
    "id": "124",
    "name": "124_DOUBLE_SWITCH",
    "seq": "SBBSBBSS",
    "target": "BIG",
    "category": "DOUBLE_SWITCH"
  },
  {
    "id": "125",
    "name": "125_DOUBLE_SWITCH",
    "seq": "BBSBBSSS",
    "target": "BIG",
    "category": "DOUBLE_SWITCH"
  },
  {
    "id": "126",
    "name": "126_DOUBLE_SWITCH",
    "seq": "SSBBSBBSSSB",
    "target": "BIG",
    "category": "DOUBLE_SWITCH"
  },
  {
    "id": "127",
    "name": "127_DOUBLE_SWITCH",
    "seq": "SSBSSBBSBBS",
    "target": "SMALL",
    "category": "DOUBLE_SWITCH"
  },
  {
    "id": "128",
    "name": "128_DOUBLE_SWITCH",
    "seq": "SSBBSBBSBSS",
    "target": "SMALL",
    "category": "DOUBLE_SWITCH"
  },
  {
    "id": "129",
    "name": "129_DOUBLE_SWITCH",
    "seq": "BSSSSBBSBBS",
    "target": "BIG",
    "category": "DOUBLE_SWITCH"
  },
  {
    "id": "130",
    "name": "130_DOUBLE_SWITCH",
    "seq": "SSBBSBBSB",
    "target": "SMALL",
    "category": "DOUBLE_SWITCH"
  },
  {
    "id": "131",
    "name": "131_DOUBLE_SWITCH",
    "seq": "BSSBBSBBS",
    "target": "SMALL",
    "category": "DOUBLE_SWITCH"
  },
  {
    "id": "132",
    "name": "132_TRIPLE_SWITCH",
    "seq": "BBBSSSBBB",
    "target": "BIG",
    "category": "TRIPLE_SWITCH"
  },
  {
    "id": "133",
    "name": "133_TRIPLE_SWITCH",
    "seq": "BBSSSBBBB",
    "target": "BIG",
    "category": "TRIPLE_SWITCH"
  },
  {
    "id": "134",
    "name": "134_TRIPLE_SWITCH",
    "seq": "BSSSBBBBB",
    "target": "SMALL",
    "category": "TRIPLE_SWITCH"
  },
  {
    "id": "135",
    "name": "135_TRIPLE_SWITCH",
    "seq": "BBBSSSBBBBBB",
    "target": "SMALL",
    "category": "TRIPLE_SWITCH"
  },
  {
    "id": "136",
    "name": "136_TRIPLE_SWITCH",
    "seq": "BBBBBBSSSBBB",
    "target": "BIG",
    "category": "TRIPLE_SWITCH"
  },
  {
    "id": "137",
    "name": "137_TRIPLE_SWITCH",
    "seq": "BBBSSSBBBS",
    "target": "BIG",
    "category": "TRIPLE_SWITCH"
  },
  {
    "id": "138",
    "name": "138_TRIPLE_SWITCH",
    "seq": "SBBBSSSBBB",
    "target": "BIG",
    "category": "TRIPLE_SWITCH"
  },
  {
    "id": "139",
    "name": "139_PAIR_FLIP",
    "seq": "SSBBSSBB",
    "target": "BIG",
    "category": "PAIR_FLIP"
  },
  {
    "id": "140",
    "name": "140_PAIR_FLIP",
    "seq": "BBSSBBSS",
    "target": "SMALL",
    "category": "PAIR_FLIP"
  },
  {
    "id": "141",
    "name": "141_PAIR_FLIP",
    "seq": "SBBSSBBS",
    "target": "BIG",
    "category": "PAIR_FLIP"
  },
  {
    "id": "142",
    "name": "142_PAIR_FLIP",
    "seq": "SSBBSSBBSSB",
    "target": "BIG",
    "category": "PAIR_FLIP"
  },
  {
    "id": "143",
    "name": "143_PAIR_FLIP",
    "seq": "SSBSSBBSSBB",
    "target": "BIG",
    "category": "PAIR_FLIP"
  },
  {
    "id": "144",
    "name": "144_PAIR_FLIP",
    "seq": "SSBBSSBBBSS",
    "target": "SMALL",
    "category": "PAIR_FLIP"
  },
  {
    "id": "145",
    "name": "145_PAIR_FLIP",
    "seq": "BSSSSBBSSBB",
    "target": "BIG",
    "category": "PAIR_FLIP"
  },
  {
    "id": "146",
    "name": "146_PAIR_FLIP",
    "seq": "SSBBSSBBS",
    "target": "BIG",
    "category": "PAIR_FLIP"
  },
  {
    "id": "147",
    "name": "147_PAIR_FLIP",
    "seq": "BSSBBSSBB",
    "target": "BIG",
    "category": "PAIR_FLIP"
  },
  {
    "id": "148",
    "name": "148_REVERSE_PAIR_FLIP",
    "seq": "BBSSBBSS",
    "target": "SMALL",
    "category": "REVERSE_PAIR_FLIP"
  },
  {
    "id": "149",
    "name": "149_REVERSE_PAIR_FLIP",
    "seq": "SSBBSSBB",
    "target": "BIG",
    "category": "REVERSE_PAIR_FLIP"
  },
  {
    "id": "150",
    "name": "150_REVERSE_PAIR_FLIP",
    "seq": "BSSBBSSB",
    "target": "SMALL",
    "category": "REVERSE_PAIR_FLIP"
  },
  {
    "id": "151",
    "name": "151_REVERSE_PAIR_FLIP",
    "seq": "BBSSBBSSBBS",
    "target": "BIG",
    "category": "REVERSE_PAIR_FLIP"
  },
  {
    "id": "152",
    "name": "152_REVERSE_PAIR_FLIP",
    "seq": "BBSBBSSBBSS",
    "target": "SMALL",
    "category": "REVERSE_PAIR_FLIP"
  },
  {
    "id": "153",
    "name": "153_REVERSE_PAIR_FLIP",
    "seq": "BBSSBBSSSBB",
    "target": "SMALL",
    "category": "REVERSE_PAIR_FLIP"
  },
  {
    "id": "154",
    "name": "154_REVERSE_PAIR_FLIP",
    "seq": "SBBBBSSBBSS",
    "target": "BIG",
    "category": "REVERSE_PAIR_FLIP"
  },
  {
    "id": "155",
    "name": "155_REVERSE_PAIR_FLIP",
    "seq": "BBSSBBSSB",
    "target": "BIG",
    "category": "REVERSE_PAIR_FLIP"
  },
  {
    "id": "156",
    "name": "156_REVERSE_PAIR_FLIP",
    "seq": "SBBSSBBSS",
    "target": "SMALL",
    "category": "REVERSE_PAIR_FLIP"
  },
  {
    "id": "157",
    "name": "157_SANDWICH",
    "seq": "SBSSBS",
    "target": "BIG",
    "category": "SANDWICH"
  },
  {
    "id": "158",
    "name": "158_SANDWICH",
    "seq": "BSSBSS",
    "target": "BIG",
    "category": "SANDWICH"
  },
  {
    "id": "159",
    "name": "159_SANDWICH",
    "seq": "SSBSSB",
    "target": "SMALL",
    "category": "SANDWICH"
  },
  {
    "id": "160",
    "name": "160_SANDWICH",
    "seq": "SBSSBSSBS",
    "target": "SMALL",
    "category": "SANDWICH"
  },
  {
    "id": "161",
    "name": "161_SANDWICH",
    "seq": "SBSSBSB",
    "target": "BIG",
    "category": "SANDWICH"
  },
  {
    "id": "162",
    "name": "162_SANDWICH",
    "seq": "BSBSSBS",
    "target": "BIG",
    "category": "SANDWICH"
  },
  {
    "id": "163",
    "name": "163_REVERSE_SANDWICH",
    "seq": "BSBBSB",
    "target": "SMALL",
    "category": "REVERSE_SANDWICH"
  },
  {
    "id": "164",
    "name": "164_REVERSE_SANDWICH",
    "seq": "SBBSBB",
    "target": "SMALL",
    "category": "REVERSE_SANDWICH"
  },
  {
    "id": "165",
    "name": "165_REVERSE_SANDWICH",
    "seq": "BBSBBS",
    "target": "BIG",
    "category": "REVERSE_SANDWICH"
  },
  {
    "id": "166",
    "name": "166_REVERSE_SANDWICH",
    "seq": "BSBBSBBSB",
    "target": "BIG",
    "category": "REVERSE_SANDWICH"
  },
  {
    "id": "167",
    "name": "167_REVERSE_SANDWICH",
    "seq": "BSBBSBS",
    "target": "BIG",
    "category": "REVERSE_SANDWICH"
  },
  {
    "id": "168",
    "name": "168_REVERSE_SANDWICH",
    "seq": "SBSBBSB",
    "target": "SMALL",
    "category": "REVERSE_SANDWICH"
  },
  {
    "id": "169",
    "name": "169_PULSE",
    "seq": "SBBSBBSB",
    "target": "SMALL",
    "category": "PULSE"
  },
  {
    "id": "170",
    "name": "170_PULSE",
    "seq": "BSBBSBBS",
    "target": "BIG",
    "category": "PULSE"
  },
  {
    "id": "171",
    "name": "171_PULSE",
    "seq": "BBSBBSBS",
    "target": "BIG",
    "category": "PULSE"
  },
  {
    "id": "172",
    "name": "172_PULSE",
    "seq": "BSBBSBSB",
    "target": "SMALL",
    "category": "PULSE"
  },
  {
    "id": "173",
    "name": "173_PULSE",
    "seq": "SBBSBBSBSBB",
    "target": "SMALL",
    "category": "PULSE"
  },
  {
    "id": "174",
    "name": "174_PULSE",
    "seq": "SBBSBBSBBSB",
    "target": "BIG",
    "category": "PULSE"
  },
  {
    "id": "175",
    "name": "175_PULSE",
    "seq": "SBBSBBSBBBS",
    "target": "BIG",
    "category": "PULSE"
  },
  {
    "id": "176",
    "name": "176_PULSE",
    "seq": "BBSSBBSBBSB",
    "target": "SMALL",
    "category": "PULSE"
  },
  {
    "id": "177",
    "name": "177_PULSE",
    "seq": "SBBSBBSBS",
    "target": "SMALL",
    "category": "PULSE"
  },
  {
    "id": "178",
    "name": "178_PULSE",
    "seq": "BSBBSBBSB",
    "target": "BIG",
    "category": "PULSE"
  },
  {
    "id": "179",
    "name": "179_REVERSE_PULSE",
    "seq": "BSSBSSBS",
    "target": "BIG",
    "category": "REVERSE_PULSE"
  },
  {
    "id": "180",
    "name": "180_REVERSE_PULSE",
    "seq": "SBSSBSSB",
    "target": "SMALL",
    "category": "REVERSE_PULSE"
  },
  {
    "id": "181",
    "name": "181_REVERSE_PULSE",
    "seq": "SSBSSBSB",
    "target": "BIG",
    "category": "REVERSE_PULSE"
  },
  {
    "id": "182",
    "name": "182_REVERSE_PULSE",
    "seq": "SBSSBSBS",
    "target": "BIG",
    "category": "REVERSE_PULSE"
  },
  {
    "id": "183",
    "name": "183_REVERSE_PULSE",
    "seq": "BSSBSSBSBSS",
    "target": "BIG",
    "category": "REVERSE_PULSE"
  },
  {
    "id": "184",
    "name": "184_REVERSE_PULSE",
    "seq": "BSSBSSBSSBS",
    "target": "SMALL",
    "category": "REVERSE_PULSE"
  },
  {
    "id": "185",
    "name": "185_REVERSE_PULSE",
    "seq": "BSSBSSBSSSB",
    "target": "SMALL",
    "category": "REVERSE_PULSE"
  },
  {
    "id": "186",
    "name": "186_REVERSE_PULSE",
    "seq": "SSBBSSBSSBS",
    "target": "SMALL",
    "category": "REVERSE_PULSE"
  },
  {
    "id": "187",
    "name": "187_REVERSE_PULSE",
    "seq": "BSSBSSBSB",
    "target": "SMALL",
    "category": "REVERSE_PULSE"
  },
  {
    "id": "188",
    "name": "188_REVERSE_PULSE",
    "seq": "SBSSBSSBS",
    "target": "SMALL",
    "category": "REVERSE_PULSE"
  },
  {
    "id": "189",
    "name": "189_HEARTBEAT",
    "seq": "SSBSSBSSB",
    "target": "BIG",
    "category": "HEARTBEAT"
  },
  {
    "id": "190",
    "name": "190_HEARTBEAT",
    "seq": "BSSBSSBSS",
    "target": "SMALL",
    "category": "HEARTBEAT"
  },
  {
    "id": "191",
    "name": "191_HEARTBEAT",
    "seq": "SBSSBSSBS",
    "target": "SMALL",
    "category": "HEARTBEAT"
  },
  {
    "id": "192",
    "name": "192_HEARTBEAT",
    "seq": "SSBSSBSSBSSB",
    "target": "BIG",
    "category": "HEARTBEAT"
  },
  {
    "id": "193",
    "name": "193_HEARTBEAT",
    "seq": "SSBSSBSSBBSS",
    "target": "BIG",
    "category": "HEARTBEAT"
  },
  {
    "id": "194",
    "name": "194_HEARTBEAT",
    "seq": "BSSSSBSSBSSB",
    "target": "BIG",
    "category": "HEARTBEAT"
  },
  {
    "id": "195",
    "name": "195_HEARTBEAT",
    "seq": "SSBSSBSSBS",
    "target": "SMALL",
    "category": "HEARTBEAT"
  },
  {
    "id": "196",
    "name": "196_HEARTBEAT",
    "seq": "BSSBSSBSSB",
    "target": "BIG",
    "category": "HEARTBEAT"
  },
  {
    "id": "197",
    "name": "197_REVERSE_HEARTBEAT",
    "seq": "BBSBBSBBS",
    "target": "BIG",
    "category": "REVERSE_HEARTBEAT"
  },
  {
    "id": "198",
    "name": "198_REVERSE_HEARTBEAT",
    "seq": "SBBSBBSBB",
    "target": "SMALL",
    "category": "REVERSE_HEARTBEAT"
  },
  {
    "id": "199",
    "name": "199_REVERSE_HEARTBEAT",
    "seq": "BSBBSBBSB",
    "target": "BIG",
    "category": "REVERSE_HEARTBEAT"
  },
  {
    "id": "200",
    "name": "200_REVERSE_HEARTBEAT",
    "seq": "BBSBBSBBSBBS",
    "target": "BIG",
    "category": "REVERSE_HEARTBEAT"
  },
  {
    "id": "201",
    "name": "201_REVERSE_HEARTBEAT",
    "seq": "BBSBBSBBSSBB",
    "target": "BIG",
    "category": "REVERSE_HEARTBEAT"
  },
  {
    "id": "202",
    "name": "202_REVERSE_HEARTBEAT",
    "seq": "SBBBBSBBSBBS",
    "target": "BIG",
    "category": "REVERSE_HEARTBEAT"
  },
  {
    "id": "203",
    "name": "203_REVERSE_HEARTBEAT",
    "seq": "BBSBBSBBSB",
    "target": "BIG",
    "category": "REVERSE_HEARTBEAT"
  },
  {
    "id": "204",
    "name": "204_REVERSE_HEARTBEAT",
    "seq": "SBBSBBSBBS",
    "target": "BIG",
    "category": "REVERSE_HEARTBEAT"
  },
  {
    "id": "205",
    "name": "205_ECHO",
    "seq": "SBBSSBBSSB",
    "target": "BIG",
    "category": "ECHO"
  },
  {
    "id": "206",
    "name": "206_ECHO",
    "seq": "BSSBBSSBBS",
    "target": "BIG",
    "category": "ECHO"
  },
  {
    "id": "207",
    "name": "207_ECHO",
    "seq": "BBSSBBSSBS",
    "target": "BIG",
    "category": "ECHO"
  },
  {
    "id": "208",
    "name": "208_ECHO",
    "seq": "BSSBBSSBSB",
    "target": "SMALL",
    "category": "ECHO"
  },
  {
    "id": "209",
    "name": "209_ECHO",
    "seq": "SBBSSBBSSBSBB",
    "target": "SMALL",
    "category": "ECHO"
  },
  {
    "id": "210",
    "name": "210_ECHO",
    "seq": "SBBSBBSSBBSSB",
    "target": "BIG",
    "category": "ECHO"
  },
  {
    "id": "211",
    "name": "211_ECHO",
    "seq": "SBBSSBBSSBBBS",
    "target": "SMALL",
    "category": "ECHO"
  },
  {
    "id": "212",
    "name": "212_ECHO",
    "seq": "BBSSBBSSBBSSB",
    "target": "BIG",
    "category": "ECHO"
  },
  {
    "id": "213",
    "name": "213_ECHO",
    "seq": "SBBSSBBSSBS",
    "target": "BIG",
    "category": "ECHO"
  },
  {
    "id": "214",
    "name": "214_ECHO",
    "seq": "BSBBSSBBSSB",
    "target": "BIG",
    "category": "ECHO"
  },
  {
    "id": "215",
    "name": "215_REVERSE_ECHO",
    "seq": "BSSBBSSBBS",
    "target": "BIG",
    "category": "REVERSE_ECHO"
  },
  {
    "id": "216",
    "name": "216_REVERSE_ECHO",
    "seq": "SBBSSBBSSB",
    "target": "BIG",
    "category": "REVERSE_ECHO"
  },
  {
    "id": "217",
    "name": "217_REVERSE_ECHO",
    "seq": "SSBBSSBBSB",
    "target": "SMALL",
    "category": "REVERSE_ECHO"
  },
  {
    "id": "218",
    "name": "218_REVERSE_ECHO",
    "seq": "SBBSSBBSBS",
    "target": "SMALL",
    "category": "REVERSE_ECHO"
  },
  {
    "id": "219",
    "name": "219_REVERSE_ECHO",
    "seq": "BSSBBSSBBSBSS",
    "target": "SMALL",
    "category": "REVERSE_ECHO"
  },
  {
    "id": "220",
    "name": "220_REVERSE_ECHO",
    "seq": "BSSBSSBBSSBBS",
    "target": "BIG",
    "category": "REVERSE_ECHO"
  },
  {
    "id": "221",
    "name": "221_REVERSE_ECHO",
    "seq": "BSSBBSSBBSSSB",
    "target": "SMALL",
    "category": "REVERSE_ECHO"
  },
  {
    "id": "222",
    "name": "222_REVERSE_ECHO",
    "seq": "SSBBSSBBSSBBS",
    "target": "BIG",
    "category": "REVERSE_ECHO"
  },
  {
    "id": "223",
    "name": "223_REVERSE_ECHO",
    "seq": "BSSBBSSBBSB",
    "target": "SMALL",
    "category": "REVERSE_ECHO"
  },
  {
    "id": "224",
    "name": "224_REVERSE_ECHO",
    "seq": "SBSSBBSSBBS",
    "target": "BIG",
    "category": "REVERSE_ECHO"
  },
  {
    "id": "225",
    "name": "225_LOOP",
    "seq": "SBBSBBSBB",
    "target": "SMALL",
    "category": "LOOP"
  },
  {
    "id": "226",
    "name": "226_LOOP",
    "seq": "BBSBBSBBS",
    "target": "BIG",
    "category": "LOOP"
  },
  {
    "id": "227",
    "name": "227_LOOP",
    "seq": "BSBBSBBSB",
    "target": "BIG",
    "category": "LOOP"
  },
  {
    "id": "228",
    "name": "228_LOOP",
    "seq": "SBBSBBSBBSBB",
    "target": "SMALL",
    "category": "LOOP"
  },
  {
    "id": "229",
    "name": "229_LOOP",
    "seq": "SBBSBBSBBBBS",
    "target": "BIG",
    "category": "LOOP"
  },
  {
    "id": "230",
    "name": "230_LOOP",
    "seq": "BBSSBBSBBSBB",
    "target": "SMALL",
    "category": "LOOP"
  },
  {
    "id": "231",
    "name": "231_LOOP",
    "seq": "SBBSBBSBBS",
    "target": "BIG",
    "category": "LOOP"
  },
  {
    "id": "232",
    "name": "232_LOOP",
    "seq": "BSBBSBBSBB",
    "target": "SMALL",
    "category": "LOOP"
  },
  {
    "id": "233",
    "name": "233_REVERSE_LOOP",
    "seq": "BSSBSSBSS",
    "target": "SMALL",
    "category": "REVERSE_LOOP"
  },
  {
    "id": "234",
    "name": "234_REVERSE_LOOP",
    "seq": "SSBSSBSSB",
    "target": "BIG",
    "category": "REVERSE_LOOP"
  },
  {
    "id": "235",
    "name": "235_REVERSE_LOOP",
    "seq": "SBSSBSSBS",
    "target": "SMALL",
    "category": "REVERSE_LOOP"
  },
  {
    "id": "236",
    "name": "236_REVERSE_LOOP",
    "seq": "BSSBSSBSSBSS",
    "target": "SMALL",
    "category": "REVERSE_LOOP"
  },
  {
    "id": "237",
    "name": "237_REVERSE_LOOP",
    "seq": "BSSBSSBSSSSB",
    "target": "BIG",
    "category": "REVERSE_LOOP"
  },
  {
    "id": "238",
    "name": "238_REVERSE_LOOP",
    "seq": "SSBBSSBSSBSS",
    "target": "SMALL",
    "category": "REVERSE_LOOP"
  },
  {
    "id": "239",
    "name": "239_REVERSE_LOOP",
    "seq": "BSSBSSBSSB",
    "target": "BIG",
    "category": "REVERSE_LOOP"
  },
  {
    "id": "240",
    "name": "240_REVERSE_LOOP",
    "seq": "SBSSBSSBSS",
    "target": "SMALL",
    "category": "REVERSE_LOOP"
  },
  {
    "id": "241",
    "name": "241_CYCLE_3",
    "seq": "SSBSSBSSB",
    "target": "BIG",
    "category": "CYCLE"
  },
  {
    "id": "242",
    "name": "242_CYCLE_3",
    "seq": "BSSBSSBSS",
    "target": "SMALL",
    "category": "CYCLE"
  },
  {
    "id": "243",
    "name": "243_CYCLE_3",
    "seq": "SBSSBSSBS",
    "target": "SMALL",
    "category": "CYCLE"
  },
  {
    "id": "244",
    "name": "244_CYCLE_3",
    "seq": "SSBSSBSSBSSB",
    "target": "BIG",
    "category": "CYCLE"
  },
  {
    "id": "245",
    "name": "245_CYCLE_3",
    "seq": "SSBSSBSSBBSS",
    "target": "BIG",
    "category": "CYCLE"
  },
  {
    "id": "246",
    "name": "246_CYCLE_3",
    "seq": "BSSSSBSSBSSB",
    "target": "BIG",
    "category": "CYCLE"
  },
  {
    "id": "247",
    "name": "247_CYCLE_3",
    "seq": "SSBSSBSSBS",
    "target": "SMALL",
    "category": "CYCLE"
  },
  {
    "id": "248",
    "name": "248_CYCLE_3",
    "seq": "BSSBSSBSSB",
    "target": "BIG",
    "category": "CYCLE"
  },
  {
    "id": "249",
    "name": "249_CYCLE_4",
    "seq": "SSSBSSSB",
    "target": "BIG",
    "category": "CYCLE"
  },
  {
    "id": "250",
    "name": "250_CYCLE_4",
    "seq": "BSSSBSSS",
    "target": "SMALL",
    "category": "CYCLE"
  },
  {
    "id": "251",
    "name": "251_CYCLE_4",
    "seq": "SSBSSSBS",
    "target": "BIG",
    "category": "CYCLE"
  },
  {
    "id": "252",
    "name": "252_CYCLE_4",
    "seq": "SBSSSBSS",
    "target": "BIG",
    "category": "CYCLE"
  },
  {
    "id": "253",
    "name": "253_CYCLE_4",
    "seq": "SSSBSSSBSSS",
    "target": "BIG",
    "category": "CYCLE"
  },
  {
    "id": "254",
    "name": "254_CYCLE_4",
    "seq": "SSSSSSBSSSB",
    "target": "SMALL",
    "category": "CYCLE"
  },
  {
    "id": "255",
    "name": "255_CYCLE_4",
    "seq": "SSSBSSSBS",
    "target": "SMALL",
    "category": "CYCLE"
  },
  {
    "id": "256",
    "name": "256_CYCLE_4",
    "seq": "BSSSBSSSB",
    "target": "BIG",
    "category": "CYCLE"
  },
  {
    "id": "257",
    "name": "257_BROKEN_ZIGZAG",
    "seq": "SBSBBBSB",
    "target": "BIG",
    "category": "BROKEN_ZIGZAG"
  },
  {
    "id": "258",
    "name": "258_BROKEN_ZIGZAG",
    "seq": "BSBBBSBS",
    "target": "BIG",
    "category": "BROKEN_ZIGZAG"
  },
  {
    "id": "259",
    "name": "259_BROKEN_ZIGZAG",
    "seq": "SBBBSBSB",
    "target": "BIG",
    "category": "BROKEN_ZIGZAG"
  },
  {
    "id": "260",
    "name": "260_BROKEN_ZIGZAG",
    "seq": "SBSBBBSBSBS",
    "target": "BIG",
    "category": "BROKEN_ZIGZAG"
  },
  {
    "id": "261",
    "name": "261_BROKEN_ZIGZAG",
    "seq": "SBSSBSBBBSB",
    "target": "SMALL",
    "category": "BROKEN_ZIGZAG"
  },
  {
    "id": "262",
    "name": "262_BROKEN_ZIGZAG",
    "seq": "SBSBBBSBS",
    "target": "SMALL",
    "category": "BROKEN_ZIGZAG"
  },
  {
    "id": "263",
    "name": "263_BROKEN_ZIGZAG",
    "seq": "BSBSBBBSB",
    "target": "SMALL",
    "category": "BROKEN_ZIGZAG"
  },
  {
    "id": "264",
    "name": "264_BROKEN_WAVE",
    "seq": "SSBBBSSB",
    "target": "BIG",
    "category": "BROKEN_WAVE"
  },
  {
    "id": "265",
    "name": "265_BROKEN_WAVE",
    "seq": "BSSBBBSS",
    "target": "BIG",
    "category": "BROKEN_WAVE"
  },
  {
    "id": "266",
    "name": "266_BROKEN_WAVE",
    "seq": "SBBBSSBS",
    "target": "BIG",
    "category": "BROKEN_WAVE"
  },
  {
    "id": "267",
    "name": "267_BROKEN_WAVE",
    "seq": "BBBSSBSS",
    "target": "BIG",
    "category": "BROKEN_WAVE"
  },
  {
    "id": "268",
    "name": "268_BROKEN_WAVE",
    "seq": "SSBBBSSBSSB",
    "target": "SMALL",
    "category": "BROKEN_WAVE"
  },
  {
    "id": "269",
    "name": "269_BROKEN_WAVE",
    "seq": "SSBSSBBBSSB",
    "target": "BIG",
    "category": "BROKEN_WAVE"
  },
  {
    "id": "270",
    "name": "270_BROKEN_WAVE",
    "seq": "SSBBBSSBBSS",
    "target": "BIG",
    "category": "BROKEN_WAVE"
  },
  {
    "id": "271",
    "name": "271_BROKEN_WAVE",
    "seq": "BSSSSBBBSSB",
    "target": "SMALL",
    "category": "BROKEN_WAVE"
  },
  {
    "id": "272",
    "name": "272_BROKEN_WAVE",
    "seq": "SSBBBSSBS",
    "target": "BIG",
    "category": "BROKEN_WAVE"
  },
  {
    "id": "273",
    "name": "273_BROKEN_WAVE",
    "seq": "BSSBBBSSB",
    "target": "BIG",
    "category": "BROKEN_WAVE"
  },
  {
    "id": "274",
    "name": "274_DOUBLE_ZIGZAG",
    "seq": "SBSBBSBS",
    "target": "BIG",
    "category": "DOUBLE_ZIGZAG"
  },
  {
    "id": "275",
    "name": "275_DOUBLE_ZIGZAG",
    "seq": "BSBBSBSS",
    "target": "BIG",
    "category": "DOUBLE_ZIGZAG"
  },
  {
    "id": "276",
    "name": "276_DOUBLE_ZIGZAG",
    "seq": "SBBSBSSB",
    "target": "SMALL",
    "category": "DOUBLE_ZIGZAG"
  },
  {
    "id": "277",
    "name": "277_DOUBLE_ZIGZAG",
    "seq": "SBSBBSBSSBS",
    "target": "BIG",
    "category": "DOUBLE_ZIGZAG"
  },
  {
    "id": "278",
    "name": "278_DOUBLE_ZIGZAG",
    "seq": "SBSSBSBBSBS",
    "target": "SMALL",
    "category": "DOUBLE_ZIGZAG"
  },
  {
    "id": "279",
    "name": "279_DOUBLE_ZIGZAG",
    "seq": "SBSBBSBSB",
    "target": "SMALL",
    "category": "DOUBLE_ZIGZAG"
  },
  {
    "id": "280",
    "name": "280_DOUBLE_ZIGZAG",
    "seq": "BSBSBBSBS",
    "target": "BIG",
    "category": "DOUBLE_ZIGZAG"
  },
  {
    "id": "281",
    "name": "281_TRIPLE_ZIGZAG",
    "seq": "BSBSSBSB",
    "target": "BIG",
    "category": "TRIPLE_ZIGZAG"
  },
  {
    "id": "282",
    "name": "282_TRIPLE_ZIGZAG",
    "seq": "SBSSBSBB",
    "target": "BIG",
    "category": "TRIPLE_ZIGZAG"
  },
  {
    "id": "283",
    "name": "283_TRIPLE_ZIGZAG",
    "seq": "BSSBSBBS",
    "target": "BIG",
    "category": "TRIPLE_ZIGZAG"
  },
  {
    "id": "284",
    "name": "284_TRIPLE_ZIGZAG",
    "seq": "BSBSSBSBBSB",
    "target": "BIG",
    "category": "TRIPLE_ZIGZAG"
  },
  {
    "id": "285",
    "name": "285_TRIPLE_ZIGZAG",
    "seq": "BSBBSBSSBSB",
    "target": "BIG",
    "category": "TRIPLE_ZIGZAG"
  },
  {
    "id": "286",
    "name": "286_TRIPLE_ZIGZAG",
    "seq": "BSBSSBSBS",
    "target": "SMALL",
    "category": "TRIPLE_ZIGZAG"
  },
  {
    "id": "287",
    "name": "287_TRIPLE_ZIGZAG",
    "seq": "SBSBSSBSB",
    "target": "BIG",
    "category": "TRIPLE_ZIGZAG"
  },
  {
    "id": "288",
    "name": "288_RUN_1_2",
    "seq": "SBBSBBSBB",
    "target": "SMALL",
    "category": "RUN_1"
  },
  {
    "id": "289",
    "name": "289_RUN_1_2",
    "seq": "BBSBBSBBS",
    "target": "BIG",
    "category": "RUN_1"
  },
  {
    "id": "290",
    "name": "290_RUN_1_2",
    "seq": "BSBBSBBSB",
    "target": "BIG",
    "category": "RUN_1"
  },
  {
    "id": "291",
    "name": "291_RUN_1_2",
    "seq": "SBBSBBSBBSBB",
    "target": "SMALL",
    "category": "RUN_1"
  },
  {
    "id": "292",
    "name": "292_RUN_1_2",
    "seq": "SBBSBBSBBBBS",
    "target": "BIG",
    "category": "RUN_1"
  },
  {
    "id": "293",
    "name": "293_RUN_1_2",
    "seq": "BBSSBBSBBSBB",
    "target": "SMALL",
    "category": "RUN_1"
  },
  {
    "id": "294",
    "name": "294_RUN_1_2",
    "seq": "SBBSBBSBBS",
    "target": "BIG",
    "category": "RUN_1"
  },
  {
    "id": "295",
    "name": "295_RUN_1_2",
    "seq": "BSBBSBBSBB",
    "target": "SMALL",
    "category": "RUN_1"
  },
  {
    "id": "296",
    "name": "296_RUN_2_1",
    "seq": "SSBSSBSSB",
    "target": "BIG",
    "category": "RUN_2"
  },
  {
    "id": "297",
    "name": "297_RUN_2_1",
    "seq": "BSSBSSBSS",
    "target": "SMALL",
    "category": "RUN_2"
  },
  {
    "id": "298",
    "name": "298_RUN_2_1",
    "seq": "SBSSBSSBS",
    "target": "SMALL",
    "category": "RUN_2"
  },
  {
    "id": "299",
    "name": "299_RUN_2_1",
    "seq": "SSBSSBSSBSSB",
    "target": "BIG",
    "category": "RUN_2"
  },
  {
    "id": "300",
    "name": "300_RUN_2_1",
    "seq": "SSBSSBSSBBSS",
    "target": "BIG",
    "category": "RUN_2"
  },
  {
    "id": "301",
    "name": "301_RUN_2_1",
    "seq": "BSSSSBSSBSSB",
    "target": "BIG",
    "category": "RUN_2"
  },
  {
    "id": "302",
    "name": "302_RUN_2_1",
    "seq": "SSBSSBSSBS",
    "target": "SMALL",
    "category": "RUN_2"
  },
  {
    "id": "303",
    "name": "303_RUN_2_1",
    "seq": "BSSBSSBSSB",
    "target": "BIG",
    "category": "RUN_2"
  },
  {
    "id": "304",
    "name": "304_RUN_2_3",
    "seq": "SSBBBSSBBB",
    "target": "SMALL",
    "category": "RUN_2"
  },
  {
    "id": "305",
    "name": "305_RUN_2_3",
    "seq": "BBBSSBBBSS",
    "target": "SMALL",
    "category": "RUN_2"
  },
  {
    "id": "306",
    "name": "306_RUN_2_3",
    "seq": "SBBBSSBBBS",
    "target": "BIG",
    "category": "RUN_2"
  },
  {
    "id": "307",
    "name": "307_RUN_2_3",
    "seq": "SSBBBSSBBBSSB",
    "target": "BIG",
    "category": "RUN_2"
  },
  {
    "id": "308",
    "name": "308_RUN_2_3",
    "seq": "SSBSSBBBSSBBB",
    "target": "SMALL",
    "category": "RUN_2"
  },
  {
    "id": "309",
    "name": "309_RUN_2_3",
    "seq": "SSBBBSSBBBBSS",
    "target": "BIG",
    "category": "RUN_2"
  },
  {
    "id": "310",
    "name": "310_RUN_2_3",
    "seq": "BSSSSBBBSSBBB",
    "target": "SMALL",
    "category": "RUN_2"
  },
  {
    "id": "311",
    "name": "311_RUN_2_3",
    "seq": "SSBBBSSBBBS",
    "target": "BIG",
    "category": "RUN_2"
  },
  {
    "id": "312",
    "name": "312_RUN_2_3",
    "seq": "BSSBBBSSBBB",
    "target": "SMALL",
    "category": "RUN_2"
  },
  {
    "id": "313",
    "name": "313_RUN_3_2",
    "seq": "BBBSSBBBSS",
    "target": "SMALL",
    "category": "RUN_3"
  },
  {
    "id": "314",
    "name": "314_RUN_3_2",
    "seq": "SSBBBSSBBB",
    "target": "SMALL",
    "category": "RUN_3"
  },
  {
    "id": "315",
    "name": "315_RUN_3_2",
    "seq": "BBSSBBBSSB",
    "target": "BIG",
    "category": "RUN_3"
  },
  {
    "id": "316",
    "name": "316_RUN_3_2",
    "seq": "BSSBBBSSBB",
    "target": "SMALL",
    "category": "RUN_3"
  },
  {
    "id": "317",
    "name": "317_RUN_3_2",
    "seq": "BBBSSBBBSSBBB",
    "target": "SMALL",
    "category": "RUN_3"
  },
  {
    "id": "318",
    "name": "318_RUN_3_2",
    "seq": "BBBBBBSSBBBSS",
    "target": "SMALL",
    "category": "RUN_3"
  },
  {
    "id": "319",
    "name": "319_RUN_3_2",
    "seq": "BBBSSBBBSSB",
    "target": "BIG",
    "category": "RUN_3"
  },
  {
    "id": "320",
    "name": "320_RUN_3_2",
    "seq": "SBBBSSBBBSS",
    "target": "SMALL",
    "category": "RUN_3"
  },
  {
    "id": "321",
    "name": "321_RUN_3_3",
    "seq": "SSSBBBSSS",
    "target": "BIG",
    "category": "RUN_3"
  },
  {
    "id": "322",
    "name": "322_RUN_3_3",
    "seq": "SSBBBSSSS",
    "target": "BIG",
    "category": "RUN_3"
  },
  {
    "id": "323",
    "name": "323_RUN_3_3",
    "seq": "SBBBSSSSS",
    "target": "BIG",
    "category": "RUN_3"
  },
  {
    "id": "324",
    "name": "324_RUN_3_3",
    "seq": "SSSBBBSSSSSS",
    "target": "SMALL",
    "category": "RUN_3"
  },
  {
    "id": "325",
    "name": "325_RUN_3_3",
    "seq": "SSSSSSBBBSSS",
    "target": "BIG",
    "category": "RUN_3"
  },
  {
    "id": "326",
    "name": "326_RUN_3_3",
    "seq": "SSSBBBSSSB",
    "target": "SMALL",
    "category": "RUN_3"
  },
  {
    "id": "327",
    "name": "327_RUN_3_3",
    "seq": "BSSSBBBSSS",
    "target": "BIG",
    "category": "RUN_3"
  },
  {
    "id": "328",
    "name": "328_RUN_4_4",
    "seq": "BBBBSSSS",
    "target": "BIG",
    "category": "RUN_4"
  },
  {
    "id": "329",
    "name": "329_RUN_4_4",
    "seq": "SSSSBBBB",
    "target": "SMALL",
    "category": "RUN_4"
  },
  {
    "id": "330",
    "name": "330_RUN_4_4",
    "seq": "BBBSSSSB",
    "target": "SMALL",
    "category": "RUN_4"
  },
  {
    "id": "331",
    "name": "331_RUN_4_4",
    "seq": "BBSSSSBB",
    "target": "SMALL",
    "category": "RUN_4"
  },
  {
    "id": "332",
    "name": "332_RUN_4_4",
    "seq": "BBBBSSSSBBB",
    "target": "SMALL",
    "category": "RUN_4"
  },
  {
    "id": "333",
    "name": "333_RUN_4_4",
    "seq": "BBBBBBBSSSS",
    "target": "BIG",
    "category": "RUN_4"
  },
  {
    "id": "334",
    "name": "334_RUN_4_4",
    "seq": "BBBBSSSSB",
    "target": "SMALL",
    "category": "RUN_4"
  },
  {
    "id": "335",
    "name": "335_RUN_4_4",
    "seq": "SBBBBSSSS",
    "target": "BIG",
    "category": "RUN_4"
  },
  {
    "id": "336",
    "name": "336_BIG_DOMINANCE",
    "seq": "BSBBBSBB",
    "target": "SMALL",
    "category": "BIG_DOMINANCE"
  },
  {
    "id": "337",
    "name": "337_BIG_DOMINANCE",
    "seq": "BBSBBBSB",
    "target": "SMALL",
    "category": "BIG_DOMINANCE"
  },
  {
    "id": "338",
    "name": "338_BIG_DOMINANCE",
    "seq": "SBBBSBBB",
    "target": "SMALL",
    "category": "BIG_DOMINANCE"
  },
  {
    "id": "339",
    "name": "339_BIG_DOMINANCE",
    "seq": "BBBSBBBS",
    "target": "BIG",
    "category": "BIG_DOMINANCE"
  },
  {
    "id": "340",
    "name": "340_BIG_DOMINANCE",
    "seq": "BSBBBSBBBSB",
    "target": "BIG",
    "category": "BIG_DOMINANCE"
  },
  {
    "id": "341",
    "name": "341_BIG_DOMINANCE",
    "seq": "BSBBSBBBSBB",
    "target": "SMALL",
    "category": "BIG_DOMINANCE"
  },
  {
    "id": "342",
    "name": "342_BIG_DOMINANCE",
    "seq": "BSBBBSBBS",
    "target": "BIG",
    "category": "BIG_DOMINANCE"
  },
  {
    "id": "343",
    "name": "343_BIG_DOMINANCE",
    "seq": "SBSBBBSBB",
    "target": "SMALL",
    "category": "BIG_DOMINANCE"
  },
  {
    "id": "344",
    "name": "344_SMALL_DOMINANCE",
    "seq": "SBSSSBSS",
    "target": "BIG",
    "category": "SMALL_DOMINANCE"
  },
  {
    "id": "345",
    "name": "345_SMALL_DOMINANCE",
    "seq": "SSBSSSBS",
    "target": "BIG",
    "category": "SMALL_DOMINANCE"
  },
  {
    "id": "346",
    "name": "346_SMALL_DOMINANCE",
    "seq": "BSSSBSSS",
    "target": "SMALL",
    "category": "SMALL_DOMINANCE"
  },
  {
    "id": "347",
    "name": "347_SMALL_DOMINANCE",
    "seq": "SSSBSSSB",
    "target": "SMALL",
    "category": "SMALL_DOMINANCE"
  },
  {
    "id": "348",
    "name": "348_SMALL_DOMINANCE",
    "seq": "SBSSSBSSSBS",
    "target": "SMALL",
    "category": "SMALL_DOMINANCE"
  },
  {
    "id": "349",
    "name": "349_SMALL_DOMINANCE",
    "seq": "SBSSBSSSBSS",
    "target": "BIG",
    "category": "SMALL_DOMINANCE"
  },
  {
    "id": "350",
    "name": "350_SMALL_DOMINANCE",
    "seq": "SBSSSBSSB",
    "target": "SMALL",
    "category": "SMALL_DOMINANCE"
  },
  {
    "id": "351",
    "name": "351_SMALL_DOMINANCE",
    "seq": "BSBSSSBSS",
    "target": "BIG",
    "category": "SMALL_DOMINANCE"
  },
  {
    "id": "352",
    "name": "352_BALANCED",
    "seq": "SBSSBBSB",
    "target": "SMALL",
    "category": "BALANCED"
  },
  {
    "id": "353",
    "name": "353_BALANCED",
    "seq": "BSBBSSBS",
    "target": "BIG",
    "category": "BALANCED"
  },
  {
    "id": "354",
    "name": "354_BALANCED",
    "seq": "BSSBBSBS",
    "target": "BIG",
    "category": "BALANCED"
  },
  {
    "id": "355",
    "name": "355_BALANCED",
    "seq": "SSBBSBSB",
    "target": "SMALL",
    "category": "BALANCED"
  },
  {
    "id": "356",
    "name": "356_BALANCED",
    "seq": "SBSSBBSBSBS",
    "target": "SMALL",
    "category": "BALANCED"
  },
  {
    "id": "357",
    "name": "357_BALANCED",
    "seq": "SBSSBSSBBSB",
    "target": "SMALL",
    "category": "BALANCED"
  },
  {
    "id": "358",
    "name": "358_BALANCED",
    "seq": "SBSSBBSBS",
    "target": "SMALL",
    "category": "BALANCED"
  },
  {
    "id": "359",
    "name": "359_BALANCED",
    "seq": "BSBSSBBSB",
    "target": "SMALL",
    "category": "BALANCED"
  },
  {
    "id": "360",
    "name": "360_MAJORITY_RUN",
    "seq": "SBSBBBBS",
    "target": "BIG",
    "category": "MAJORITY_RUN"
  },
  {
    "id": "361",
    "name": "361_MAJORITY_RUN",
    "seq": "SBBBBSBS",
    "target": "BIG",
    "category": "MAJORITY_RUN"
  },
  {
    "id": "362",
    "name": "362_MAJORITY_RUN",
    "seq": "BSBBBBSS",
    "target": "BIG",
    "category": "MAJORITY_RUN"
  },
  {
    "id": "363",
    "name": "363_MAJORITY_RUN",
    "seq": "SBBBBSSB",
    "target": "SMALL",
    "category": "MAJORITY_RUN"
  },
  {
    "id": "364",
    "name": "364_MAJORITY_RUN",
    "seq": "SBSBBBBSSBS",
    "target": "BIG",
    "category": "MAJORITY_RUN"
  },
  {
    "id": "365",
    "name": "365_MAJORITY_RUN",
    "seq": "SBSSBSBBBBS",
    "target": "BIG",
    "category": "MAJORITY_RUN"
  },
  {
    "id": "366",
    "name": "366_MAJORITY_RUN",
    "seq": "SBSBBBBSB",
    "target": "SMALL",
    "category": "MAJORITY_RUN"
  },
  {
    "id": "367",
    "name": "367_MAJORITY_RUN",
    "seq": "BSBSBBBBS",
    "target": "SMALL",
    "category": "MAJORITY_RUN"
  },
  {
    "id": "368",
    "name": "368_MINORITY_FLIP",
    "seq": "BBBSBBSS",
    "target": "BIG",
    "category": "MINORITY_FLIP"
  },
  {
    "id": "369",
    "name": "369_MINORITY_FLIP",
    "seq": "SSBBSBBB",
    "target": "SMALL",
    "category": "MINORITY_FLIP"
  },
  {
    "id": "370",
    "name": "370_MINORITY_FLIP",
    "seq": "BBSBBSSB",
    "target": "SMALL",
    "category": "MINORITY_FLIP"
  },
  {
    "id": "371",
    "name": "371_MINORITY_FLIP",
    "seq": "BSBBSSBB",
    "target": "BIG",
    "category": "MINORITY_FLIP"
  },
  {
    "id": "372",
    "name": "372_MINORITY_FLIP",
    "seq": "BBBSBBSSBBB",
    "target": "BIG",
    "category": "MINORITY_FLIP"
  },
  {
    "id": "373",
    "name": "373_MINORITY_FLIP",
    "seq": "BBBBBBSBBSS",
    "target": "SMALL",
    "category": "MINORITY_FLIP"
  },
  {
    "id": "374",
    "name": "374_MINORITY_FLIP",
    "seq": "BBBSBBSSB",
    "target": "BIG",
    "category": "MINORITY_FLIP"
  },
  {
    "id": "375",
    "name": "375_MINORITY_FLIP",
    "seq": "SBBBSBBSS",
    "target": "SMALL",
    "category": "MINORITY_FLIP"
  },
  {
    "id": "376",
    "name": "376_DOUBLE_TOP",
    "seq": "SBBBSBBB",
    "target": "SMALL",
    "category": "DOUBLE_TOP"
  },
  {
    "id": "377",
    "name": "377_DOUBLE_TOP",
    "seq": "BBBSBBBS",
    "target": "BIG",
    "category": "DOUBLE_TOP"
  },
  {
    "id": "378",
    "name": "378_DOUBLE_TOP",
    "seq": "BBSBBBSB",
    "target": "SMALL",
    "category": "DOUBLE_TOP"
  },
  {
    "id": "379",
    "name": "379_DOUBLE_TOP",
    "seq": "SBBBSBBBSBB",
    "target": "SMALL",
    "category": "DOUBLE_TOP"
  },
  {
    "id": "380",
    "name": "380_DOUBLE_TOP",
    "seq": "SBBSBBBSBBB",
    "target": "BIG",
    "category": "DOUBLE_TOP"
  },
  {
    "id": "381",
    "name": "381_DOUBLE_TOP",
    "seq": "SBBBSBBBBBS",
    "target": "SMALL",
    "category": "DOUBLE_TOP"
  },
  {
    "id": "382",
    "name": "382_DOUBLE_TOP",
    "seq": "BBSSBBBSBBB",
    "target": "BIG",
    "category": "DOUBLE_TOP"
  },
  {
    "id": "383",
    "name": "383_DOUBLE_TOP",
    "seq": "SBBBSBBBS",
    "target": "SMALL",
    "category": "DOUBLE_TOP"
  },
  {
    "id": "384",
    "name": "384_DOUBLE_TOP",
    "seq": "BSBBBSBBB",
    "target": "BIG",
    "category": "DOUBLE_TOP"
  },
  {
    "id": "385",
    "name": "385_DOUBLE_BOTTOM",
    "seq": "BSSSBSSS",
    "target": "SMALL",
    "category": "DOUBLE_BOTTOM"
  },
  {
    "id": "386",
    "name": "386_DOUBLE_BOTTOM",
    "seq": "SSSBSSSB",
    "target": "SMALL",
    "category": "DOUBLE_BOTTOM"
  },
  {
    "id": "387",
    "name": "387_DOUBLE_BOTTOM",
    "seq": "SSBSSSBS",
    "target": "BIG",
    "category": "DOUBLE_BOTTOM"
  },
  {
    "id": "388",
    "name": "388_DOUBLE_BOTTOM",
    "seq": "BSSSBSSSBSS",
    "target": "BIG",
    "category": "DOUBLE_BOTTOM"
  },
  {
    "id": "389",
    "name": "389_DOUBLE_BOTTOM",
    "seq": "BSSBSSSBSSS",
    "target": "BIG",
    "category": "DOUBLE_BOTTOM"
  },
  {
    "id": "390",
    "name": "390_DOUBLE_BOTTOM",
    "seq": "BSSSBSSSSSB",
    "target": "SMALL",
    "category": "DOUBLE_BOTTOM"
  },
  {
    "id": "391",
    "name": "391_DOUBLE_BOTTOM",
    "seq": "SSBBSSSBSSS",
    "target": "SMALL",
    "category": "DOUBLE_BOTTOM"
  },
  {
    "id": "392",
    "name": "392_DOUBLE_BOTTOM",
    "seq": "BSSSBSSSB",
    "target": "BIG",
    "category": "DOUBLE_BOTTOM"
  },
  {
    "id": "393",
    "name": "393_DOUBLE_BOTTOM",
    "seq": "SBSSSBSSS",
    "target": "BIG",
    "category": "DOUBLE_BOTTOM"
  },
  {
    "id": "394",
    "name": "394_TRIPLE_TOP",
    "seq": "SBBBBSBBBB",
    "target": "BIG",
    "category": "TRIPLE_TOP"
  },
  {
    "id": "395",
    "name": "395_TRIPLE_TOP",
    "seq": "BBBBSBBBBS",
    "target": "SMALL",
    "category": "TRIPLE_TOP"
  },
  {
    "id": "396",
    "name": "396_TRIPLE_TOP",
    "seq": "BBBSBBBBSB",
    "target": "BIG",
    "category": "TRIPLE_TOP"
  },
  {
    "id": "397",
    "name": "397_TRIPLE_TOP",
    "seq": "SBBBBSBBBBSBB",
    "target": "BIG",
    "category": "TRIPLE_TOP"
  },
  {
    "id": "398",
    "name": "398_TRIPLE_TOP",
    "seq": "SBBSBBBBSBBBB",
    "target": "BIG",
    "category": "TRIPLE_TOP"
  },
  {
    "id": "399",
    "name": "399_TRIPLE_TOP",
    "seq": "SBBBBSBBBBBBS",
    "target": "SMALL",
    "category": "TRIPLE_TOP"
  },
  {
    "id": "400",
    "name": "400_TRIPLE_TOP",
    "seq": "BBSSBBBBSBBBB",
    "target": "BIG",
    "category": "TRIPLE_TOP"
  },
  {
    "id": "401",
    "name": "401_TRIPLE_TOP",
    "seq": "SBBBBSBBBBS",
    "target": "SMALL",
    "category": "TRIPLE_TOP"
  },
  {
    "id": "402",
    "name": "402_TRIPLE_TOP",
    "seq": "BSBBBBSBBBB",
    "target": "BIG",
    "category": "TRIPLE_TOP"
  },
  {
    "id": "403",
    "name": "403_TRIPLE_BOTTOM",
    "seq": "BSSSSBSSSS",
    "target": "SMALL",
    "category": "TRIPLE_BOTTOM"
  },
  {
    "id": "404",
    "name": "404_TRIPLE_BOTTOM",
    "seq": "SSSSBSSSSB",
    "target": "SMALL",
    "category": "TRIPLE_BOTTOM"
  },
  {
    "id": "405",
    "name": "405_TRIPLE_BOTTOM",
    "seq": "SSSBSSSSBS",
    "target": "BIG",
    "category": "TRIPLE_BOTTOM"
  },
  {
    "id": "406",
    "name": "406_TRIPLE_BOTTOM",
    "seq": "BSSSSBSSSSBSS",
    "target": "SMALL",
    "category": "TRIPLE_BOTTOM"
  },
  {
    "id": "407",
    "name": "407_TRIPLE_BOTTOM",
    "seq": "BSSBSSSSBSSSS",
    "target": "SMALL",
    "category": "TRIPLE_BOTTOM"
  },
  {
    "id": "408",
    "name": "408_TRIPLE_BOTTOM",
    "seq": "BSSSSBSSSSSSB",
    "target": "BIG",
    "category": "TRIPLE_BOTTOM"
  },
  {
    "id": "409",
    "name": "409_TRIPLE_BOTTOM",
    "seq": "SSBBSSSSBSSSS",
    "target": "SMALL",
    "category": "TRIPLE_BOTTOM"
  },
  {
    "id": "410",
    "name": "410_TRIPLE_BOTTOM",
    "seq": "BSSSSBSSSSB",
    "target": "SMALL",
    "category": "TRIPLE_BOTTOM"
  },
  {
    "id": "411",
    "name": "411_TRIPLE_BOTTOM",
    "seq": "SBSSSSBSSSS",
    "target": "SMALL",
    "category": "TRIPLE_BOTTOM"
  },
  {
    "id": "412",
    "name": "412_GENERATED_1",
    "seq": "BSSSSSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "413",
    "name": "413_GENERATED_2",
    "seq": "SBSSSSSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "414",
    "name": "414_GENERATED_3",
    "seq": "BBSSSSSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "415",
    "name": "415_GENERATED_4",
    "seq": "SSBSSSSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "416",
    "name": "416_GENERATED_5",
    "seq": "BSBSSSSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "417",
    "name": "417_GENERATED_6",
    "seq": "SBBSSSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "418",
    "name": "418_GENERATED_7",
    "seq": "BBBSSSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "419",
    "name": "419_GENERATED_8",
    "seq": "SSSBSSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "420",
    "name": "420_GENERATED_9",
    "seq": "BSSBSSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "421",
    "name": "421_GENERATED_10",
    "seq": "SBSBSSSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "422",
    "name": "422_GENERATED_11",
    "seq": "BBSBSSSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "423",
    "name": "423_GENERATED_12",
    "seq": "SSBBSSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "424",
    "name": "424_GENERATED_13",
    "seq": "BSBBSSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "425",
    "name": "425_GENERATED_14",
    "seq": "SBBBSSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "426",
    "name": "426_GENERATED_15",
    "seq": "BBBBSSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "427",
    "name": "427_GENERATED_16",
    "seq": "SSSSBSSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "428",
    "name": "428_GENERATED_17",
    "seq": "BSSSBSSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "429",
    "name": "429_GENERATED_18",
    "seq": "SBSSBSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "430",
    "name": "430_GENERATED_19",
    "seq": "BBSSBSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "431",
    "name": "431_GENERATED_20",
    "seq": "SSBSBSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "432",
    "name": "432_GENERATED_21",
    "seq": "BSBSBSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "433",
    "name": "433_GENERATED_22",
    "seq": "SBBSBSSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "434",
    "name": "434_GENERATED_23",
    "seq": "BBBSBSSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "435",
    "name": "435_GENERATED_24",
    "seq": "SSSBBSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "436",
    "name": "436_GENERATED_25",
    "seq": "BSSBBSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "437",
    "name": "437_GENERATED_26",
    "seq": "SBSBBSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "438",
    "name": "438_GENERATED_27",
    "seq": "BBSBBSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "439",
    "name": "439_GENERATED_28",
    "seq": "SSBBBSSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "440",
    "name": "440_GENERATED_29",
    "seq": "BSBBBSSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "441",
    "name": "441_GENERATED_30",
    "seq": "SBBBBSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "442",
    "name": "442_GENERATED_31",
    "seq": "BBBBBSSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "443",
    "name": "443_GENERATED_32",
    "seq": "SSSSSBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "444",
    "name": "444_GENERATED_33",
    "seq": "BSSSSBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "445",
    "name": "445_GENERATED_34",
    "seq": "SBSSSBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "446",
    "name": "446_GENERATED_35",
    "seq": "BBSSSBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "447",
    "name": "447_GENERATED_36",
    "seq": "SSBSSBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "448",
    "name": "448_GENERATED_37",
    "seq": "BSBSSBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "449",
    "name": "449_GENERATED_38",
    "seq": "SBBSSBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "450",
    "name": "450_GENERATED_39",
    "seq": "BBBSSBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "451",
    "name": "451_GENERATED_40",
    "seq": "SSSBSBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "452",
    "name": "452_GENERATED_41",
    "seq": "BSSBSBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "453",
    "name": "453_GENERATED_42",
    "seq": "SBSBSBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "454",
    "name": "454_GENERATED_43",
    "seq": "BBSBSBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "455",
    "name": "455_GENERATED_44",
    "seq": "SSBBSBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "456",
    "name": "456_GENERATED_45",
    "seq": "BSBBSBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "457",
    "name": "457_GENERATED_46",
    "seq": "SBBBSBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "458",
    "name": "458_GENERATED_47",
    "seq": "BBBBSBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "459",
    "name": "459_GENERATED_48",
    "seq": "SSSSBBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "460",
    "name": "460_GENERATED_49",
    "seq": "BSSSBBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "461",
    "name": "461_GENERATED_50",
    "seq": "SBSSBBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "462",
    "name": "462_GENERATED_51",
    "seq": "BBSSBBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "463",
    "name": "463_GENERATED_52",
    "seq": "SSBSBBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "464",
    "name": "464_GENERATED_53",
    "seq": "BSBSBBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "465",
    "name": "465_GENERATED_54",
    "seq": "SBBSBBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "466",
    "name": "466_GENERATED_55",
    "seq": "BBBSBBSSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "467",
    "name": "467_GENERATED_56",
    "seq": "SSSBBBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "468",
    "name": "468_GENERATED_57",
    "seq": "BSSBBBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "469",
    "name": "469_GENERATED_58",
    "seq": "SBSBBBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "470",
    "name": "470_GENERATED_59",
    "seq": "BBSBBBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "471",
    "name": "471_GENERATED_60",
    "seq": "SSBBBBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "472",
    "name": "472_GENERATED_61",
    "seq": "BSBBBBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "473",
    "name": "473_GENERATED_62",
    "seq": "SBBBBBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "474",
    "name": "474_GENERATED_63",
    "seq": "BBBBBBSSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "475",
    "name": "475_GENERATED_64",
    "seq": "SSSSSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "476",
    "name": "476_GENERATED_65",
    "seq": "BSSSSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "477",
    "name": "477_GENERATED_66",
    "seq": "SBSSSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "478",
    "name": "478_GENERATED_67",
    "seq": "BBSSSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "479",
    "name": "479_GENERATED_68",
    "seq": "SSBSSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "480",
    "name": "480_GENERATED_69",
    "seq": "BSBSSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "481",
    "name": "481_GENERATED_70",
    "seq": "SBBSSSBSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "482",
    "name": "482_GENERATED_71",
    "seq": "BBBSSSBSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "483",
    "name": "483_GENERATED_72",
    "seq": "SSSBSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "484",
    "name": "484_GENERATED_73",
    "seq": "BSSBSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "485",
    "name": "485_GENERATED_74",
    "seq": "SBSBSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "486",
    "name": "486_GENERATED_75",
    "seq": "BBSBSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "487",
    "name": "487_GENERATED_76",
    "seq": "SSBBSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "488",
    "name": "488_GENERATED_77",
    "seq": "BSBBSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "489",
    "name": "489_GENERATED_78",
    "seq": "SBBBSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "490",
    "name": "490_GENERATED_79",
    "seq": "BBBBSSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "491",
    "name": "491_GENERATED_80",
    "seq": "SSSSBSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "492",
    "name": "492_GENERATED_81",
    "seq": "BSSSBSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "493",
    "name": "493_GENERATED_82",
    "seq": "SBSSBSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "494",
    "name": "494_GENERATED_83",
    "seq": "BBSSBSBSSS",
    "target": "BIG",
    "category": "GENERATED"
  },
  {
    "id": "495",
    "name": "495_GENERATED_84",
    "seq": "SSBSBSBSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "496",
    "name": "496_GENERATED_85",
    "seq": "BSBSBSBSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "497",
    "name": "497_GENERATED_86",
    "seq": "SBBSBSBSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "498",
    "name": "498_GENERATED_87",
    "seq": "BBBSBSBSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "499",
    "name": "499_GENERATED_88",
    "seq": "SSSBBSBSSS",
    "target": "SMALL",
    "category": "GENERATED"
  },
  {
    "id": "500",
    "name": "500_GENERATED_89",
    "seq": "BSSBBSBSSS",
    "target": "SMALL",
    "category": "GENERATED"
  }
];
