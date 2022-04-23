// Create a cartesian product
const cartesian = axes => axes.reduce(
    (a, b) => a.flatMap(x => b.map(y => [...x, y])), [[]]
);

export default cartesian