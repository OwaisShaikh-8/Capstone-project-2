// hooks/useAuth.js
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  // useUpdateProfileMutation,
} from "../services/auth-api";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  const [registerApi, registerState] = useRegisterMutation();
  const [loginApi, loginState] = useLoginMutation();
  const [logoutApi, logoutState] = useLogoutMutation();
  // const [updateProfileApi, updateProfileState] = useUpdateProfileMutation();

  const signup = async (data) => {
    try {
      const res = await registerApi(data).unwrap();
      // State is already updated in RTK Query onQueryStarted
      navigate(`/home/${res.user.id}`);
      return { success: true, data: res };
    } catch (error) {
      return { success: false, error };
    }
  };

  const login = async (data) => {
    try {
      const res = await loginApi(data).unwrap();
      // State is already updated in RTK Query onQueryStarted
      navigate(`/home/${res.user.id}`);
      return { success: true, data: res };
    } catch (error) {
      return { success: false, error };
    }
  };

  const signout = async () => {
    try {
      await logoutApi().unwrap();
      navigate("/login", { replace: true });
    } catch (error) {
      // Navigation handled in finally or here
      navigate("/login", { replace: true });
    }
  };

  // const updateProfile = async (data) => {
  //   try {
  //     const res = await updateProfileApi(data).unwrap();
  //     // Manually update state for updateProfile
  //     dispatch(setCredentials(res));
  //     return { success: true, data: res };
  //   } catch (error) {
  //     return { success: false, error };
  //   }
  // };

  return {
    user,
    token,
    isAuthenticated: !!user && !!token,
    signup,
    login,
    logout: signout,
    // updateProfile,
    loading:
      registerState.isLoading ||
      loginState.isLoading ||
      logoutState.isLoading,
      // updateProfileState.isLoading,
    error:
      registerState.error ||
      loginState.error ||
      logoutState.error 
      // updateProfileState.error,
  };
};