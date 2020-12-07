const OUTER_BAG_REGEX = /(?<color>.+?) bags contain (?<contents>.+)/;
const INNER_BAG_REGEX = /(?<amount>\d+) (?<color>.+?) bag/g;

type ParentBagMap = { [key: string]: Array<string> };
type ChildrenBagMap = { [outer: string]: { [inner: string]: number } };

export const parentToChildrenMap = function (inputLines): ChildrenBagMap {
  const map = {};
  for (const line of inputLines) {
    const outer = OUTER_BAG_REGEX.exec(line);
    map[outer.groups.color] = {};
    let inner;
    while ((inner = INNER_BAG_REGEX.exec(outer.groups.contents))) {
      map[outer.groups.color][inner.groups.color] = inner.groups.amount;
    }
  }
  return map;
};

export const childToParentMap = function (inputLines): ParentBagMap {
  const map = {};
  for (const line of inputLines) {
    const outer = OUTER_BAG_REGEX.exec(line);
    let inner;
    while ((inner = INNER_BAG_REGEX.exec(outer.groups.contents))) {
      if (!map.hasOwnProperty(inner.groups.color)) {
        map[inner.groups.color] = [];
      }
      map[inner.groups.color].push(outer.groups.color);
    }
  }
  return map;
};

/**
 * Includes the top-level bag
 * @param bagMap
 * @param firstColor
 */
export const numberOfBagsStartingWith = function (
  bagMap: ChildrenBagMap,
  firstColor: string
) {
  return Object.entries(bagMap[firstColor]).reduce((total, [color, amount]) => {
    return total + amount * numberOfBagsStartingWith(bagMap, color);
  }, 1);
};

/**
 * Includes the wanted color itself
 * @param bagMap
 * @param wantedColor
 */
export const possibleAncestorsFor = function (
  bagMap: ParentBagMap,
  wantedColor: string
) {
  const foundContainers = new Set([wantedColor]);
  const containersToCheck = new Set(bagMap[wantedColor]);

  transitiveContainersHelper(foundContainers, containersToCheck, bagMap);
  return foundContainers;
};

function transitiveContainersHelper(
  found: Set<string>,
  toCheck: Set<string>,
  bagMap: ParentBagMap
) {
  let color;
  while (toCheck.size > 0) {
    color = Array.from(toCheck)[0];
    toCheck.delete(color);
    if (!found.has(color)) {
      found.add(color);
      if (bagMap.hasOwnProperty(color)) {
        for (const outerColor of bagMap[color]) {
          if (!found.has(outerColor)) {
            toCheck.add(outerColor);
          }
        }
      } else {
        // Top level bag
      }
    }
  }
}
