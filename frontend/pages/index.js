import { useRouter } from "next/router";

export default function LandingPage(){
    const router = useRouter();
    return (
        <div>
            <h1> This is Landing Page </h1>
        </div>
    );
}