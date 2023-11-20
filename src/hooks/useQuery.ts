import { useLocation } from "react-router-dom";

// hook to get query path url
export default function useQuery() {
    const location = useLocation();
    return new URLSearchParams(location.search);
}
