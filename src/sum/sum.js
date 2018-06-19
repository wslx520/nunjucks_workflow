function fn(a,b,c) {
    console.log(a,b,c);
    return a + b + c;
}
export default fn

export const html = `<div> <del>test of jsx.</del>
fn(1,2,3) = ${fn(1,2,3)}</div>`