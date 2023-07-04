export type ClassType = string | null | false | undefined;

function joinClassnames(...classes: ClassType[]): string {
    return classes.filter(Boolean).join(" ");
}

const cx = joinClassnames;

export default joinClassnames;
export { cx, joinClassnames };