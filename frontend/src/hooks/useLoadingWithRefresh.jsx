import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/user/employeeSlice";
import employeeService from "../api/employeeApi";

export const useLoadingWithRefresh = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const { data } = await employeeService.profileEmployee();
        if (isMounted) {
          dispatch(setAuth(data));
        }
      } catch (err) {
        if (isMounted) {
          console.error("Erro ao carregar perfil:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return { loading };
};
