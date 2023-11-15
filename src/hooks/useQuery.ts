import { useLocation } from "react-router-dom";

export default function useQuery() {
    const location = useLocation();
    return new URLSearchParams(location.search);
}
