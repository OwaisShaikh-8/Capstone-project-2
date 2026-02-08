import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  useCreateVenueMutation,
  useGetOwnerVenuesQuery,
  useGetVenuesByCityQuery,
  useGetActiveVenueQuery,
  useDeleteVenueMutation,
} from "../services/venue-api.js";

const useVenue = ({
  city = null,
  venueId = null,
  shouldFetchOwnerVenues = false,
  shouldFetchCityVenues = false,
  shouldFetchActiveVenue = false,
} = {}) => {
  // =====================
  // 📦 Redux State
  // =====================
  const venues = useSelector((state) => state.venues.venues);
  const activeVenue = useSelector((state) => state.venues.activeVenue);

  // =====================
  // 🔹 Queries
  // =====================
  const {
    isLoading: isOwnerVenuesLoading,
    isError: isOwnerVenuesError,
    error: ownerVenuesError,
    refetch: refetchOwnerVenues,
  } = useGetOwnerVenuesQuery(undefined, {
    skip: !shouldFetchOwnerVenues
  });

  const {
    isLoading: isCityVenuesLoading,
    isError: isCityVenuesError,
    error: cityVenuesError,
    refetch: refetchCityVenues,
  } = useGetVenuesByCityQuery(city, {
    skip: !shouldFetchCityVenues || !city,
     refetchOnMountOrArgChange: true, 
  });

  const {
    isLoading: isActiveVenueLoading,
    isError: isActiveVenueError,
    error: activeVenueError,
    refetch: refetchActiveVenue,
  } = useGetActiveVenueQuery(venueId, {
    skip: !shouldFetchActiveVenue || !venueId,
    refetchOnMountOrArgChange: true, 
  });

  // =====================
  // 🔹 Mutations
  // =====================
  const [
    createVenue,
    {
      isLoading: isCreateVenueLoading,
      isError: isCreateVenueError,
      error: createVenueError,
    },
  ] = useCreateVenueMutation();

  const [
    deleteVenue,
    {
      isLoading: isDeleteVenueLoading,
      isError: isDeleteVenueError,
      error: deleteVenueError,
    },
  ] = useDeleteVenueMutation();

  // =====================
  // 🚀 Actions
  // =====================
  const createNewVenue = useCallback(
    async (venueData) => {
      console.log(venueData);
      try {
        const response = await createVenue(venueData).unwrap();
        return response;
      } catch (error) {
        console.error("Create venue failed:", error);
        throw error;
      }
    },
    [createVenue]
  );

  const removeVenue = useCallback(
    async (venueId) => {
      try {
        const response = await deleteVenue(venueId).unwrap();
        return response;
      } catch (error) {
        console.error("Delete venue failed:", error);
        throw error;
      }
    },
    [deleteVenue]
  );

  const fetchOwnerVenues = useCallback(async () => {
    try {
      const response = await refetchOwnerVenues();
      return response.data;
    } catch (error) {
      console.error("Fetch owner venues failed:", error);
      throw error;
    }
  }, [refetchOwnerVenues]);

  const fetchVenuesByCity = useCallback(async () => {
    try {
      const response = await refetchCityVenues();
      return response.data;
    } catch (error) {
      console.error("Fetch city venues failed:", error);
      throw error;
    }
  }, [refetchCityVenues]);

  const fetchActiveVenue = useCallback(async () => {
    try {
      const response = await refetchActiveVenue();
      return response.data;
    } catch (error) {
      console.error("Fetch active venue failed:", error);
      throw error;
    }
  }, [refetchActiveVenue]);

  // =====================
  // 📤 Return API
  // =====================
  return {
    // State
    venues,
    activeVenue,

    // Actions
    createNewVenue,
    removeVenue,
    fetchOwnerVenues,
    fetchVenuesByCity,
    fetchActiveVenue,

    // Loading states
    isOwnerVenuesLoading,
    isCityVenuesLoading,
    isActiveVenueLoading,
    isCreateVenueLoading,
    isDeleteVenueLoading,

    // Error flags
    isOwnerVenuesError,
    isCityVenuesError,
    isActiveVenueError,
    isCreateVenueError,
    isDeleteVenueError,

    // Error objects
    ownerVenuesError,
    cityVenuesError,
    activeVenueError,
    createVenueError,
    deleteVenueError,
  };
};

export default useVenue;