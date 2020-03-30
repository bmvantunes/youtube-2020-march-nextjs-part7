import { NextPageContext } from "next";
import { myGet } from "../../api/myGet";

export default function People({people} : any) {
    return <div>Hello People {JSON.stringify(people)}</div>
}

People.getInitialProps = async (ctx: NextPageContext) => {
    const json = await myGet('http://localhost:3000/api/people', ctx);
    return {people: json};
}
