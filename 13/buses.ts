import { smallestMultipleAtLeastAsLargeAs } from "../util/math";

export const earliestAvailableBus = function (startWaitingAt, busIds) {
  const nextDepartures = busIds.map((bus) => ({
    bus,
    departing: smallestMultipleAtLeastAsLargeAs(bus, startWaitingAt),
  }));

  let earliestDeparture = nextDepartures[0];
  for (const departure of nextDepartures) {
    if (departure.departing < earliestDeparture.departing) {
      earliestDeparture = departure;
    }
  }

  return (earliestDeparture.departing - startWaitingAt) * earliestDeparture.bus;
};

export const findConsecutiveDepartures = function (busesWithOffsets) {
  /*
  This is related to Diophantine equations.
  In fact, the bus ids are all prime (and thus co-prime) so it's an example of the Chinese Remainder Theorem.
  With the example data (7,13,x,x,59,x,31,19), the departure time must:
  * A) Be a multiple of 7, or equivalently t = 0 mod 7
  * B) Be 1 less than a multiple of 13,    t = -1 mod 13
  * C) Be 4 less than a multiple of 59,    t = -4 mod 59
  * D) Be 6 less than a multiple of 31,    t = -6 mod 31
  * E) Be 7 less than a multiple of 19,    t = -4 mod 19
  * 
  * We can start by finding all numbers which satisfy A (7 * i, i being any natural number),
  * one of these will eventually satisfy B. The first one is 77 = (7 * 11) = (13 * 6 - 1)
  * Because the buses are coprime, we can now test 77 + (7 * 13) * i until we find a solution to C, and so on.
  * This algorithm is slightly more efficient if we start with the largest bus ids.
  * 
  * There are, apparently, much more efficient algorithms, but this is one I understand.
  */

  const sortedBusesWithOffsets: Array<any> = busesWithOffsets.sort(
    (a, b) => b.bus - a.bus
  );
  const firstBusWithOffset = sortedBusesWithOffsets.shift();
  let multiple = firstBusWithOffset.bus;
  let offset = -firstBusWithOffset.offset;
  for (const nextBusWithOffset of sortedBusesWithOffsets) {
    for (let i = 0; ; i++) {
      const candidate = i * multiple + offset;
      if (
        (candidate + nextBusWithOffset.offset) % nextBusWithOffset.bus ===
        0
      ) {
        offset = candidate;
        multiple = multiple * nextBusWithOffset.bus;
        break;
      }
    }
  }

  return offset;
};
