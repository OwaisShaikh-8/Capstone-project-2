// hooks/useBooking.js
import { useSelector } from "react-redux";
import {
  useGetBookingsByOwnerQuery,
  useGetBookingsByCustomerQuery,
  useAddBookingMutation,
  useUpdateBookingByOwnerMutation,
  useCancelBookingByOwnerMutation,
  useCancelBookingByCustomerMutation,
  useDeleteBookingMutation,
  useLazyCheckAvailabilityQuery,
} from "../services/booking-api";

export default function useBooking({
  // ownerId = null,
  customerId = null,
  shouldFetchByOwner = false,
  shouldFetchByCustomer = false,
} = {}) {
  // =========================
  // Redux State
  // =========================
  const bookings = useSelector((state) => state.booking.bookings);
  const activeBooking = useSelector((state) => state.booking.activeBooking);

  // =========================
  // Queries (controlled)
  // =========================
  const ownerQuery = useGetBookingsByOwnerQuery(undefined, {
    skip: !shouldFetchByOwner,
  });

  const customerQuery = useGetBookingsByCustomerQuery(customerId, {
    skip: !shouldFetchByCustomer || !customerId,
  });

  // =========================
  // Mutations
  // =========================
  const [addBooking, addBookingState] = useAddBookingMutation();
  const [acceptBooking, acceptBookingState] = useUpdateBookingByOwnerMutation();
  const [cancelByOwner, cancelByOwnerState] = useCancelBookingByOwnerMutation();
  const [cancelByCustomer, cancelByCustomerState] =
    useCancelBookingByCustomerMutation();
  const [deleteBooking, deleteBookingState] = useDeleteBookingMutation();
  const [checkAvailability, availabilityState] = useLazyCheckAvailabilityQuery();

  // =========================
  // Actions
  // =========================

  /**
   * Create a new booking with payment receipt
   * @param {FormData} formData - FormData containing booking details and receipt file
   * @returns {Promise} - Resolves with created booking object
   */
  const createBooking = async (formData) => {
    try {
      const result = await addBooking(formData).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Accept a booking (owner only)
   * @param {string} bookingId - ID of the booking to accept
   * @returns {Promise} - Resolves with updated booking object
   */
  const acceptBookingByOwner = async (bookingId) => {
    try {
      const result = await acceptBooking({
        bookingId,
        status: "accepted",
      }).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Cancel a booking as owner (deletes receipt from Cloudinary)
   * @param {string} bookingId - ID of the booking to cancel
   * @param {string} reason - Reason for cancellation
   * @returns {Promise} - Resolves with updated booking object
   */
  const cancelBookingOwner = async (
    bookingId,
    reason = "Canceled by owner",
  ) => {
    try {
      const result = await cancelByOwner({ bookingId, reason }).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Cancel a booking as customer (deletes receipt from Cloudinary)
   * @param {string} bookingId - ID of the booking to cancel
   * @param {string} reason - Reason for cancellation
   * @returns {Promise} - Resolves with updated booking object
   */
  const cancelBookingCustomer = async (
    bookingId,
    reason = "Canceled by customer",
  ) => {
    try {
      const result = await cancelByCustomer({ bookingId, reason }).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Delete a booking permanently (removes from DB and deletes receipt from Cloudinary)
   * @param {string} bookingId - ID of the booking to delete
   * @returns {Promise} - Resolves with success message
   */
  const removeBooking = async (bookingId) => {
    try {
      const result = await deleteBooking(bookingId).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const checkVenueAvailability = async ({ venueId, date, timeSlot }) => {
    try {
      const result = await checkAvailability({
        venueId,
        date,
        timeSlot,
      }).unwrap();

      return result; // true / false
    } catch (error) {
      throw error;
    }
  };

  // =========================
  // Return API
  // =========================
  return {
    // ============ DATA ============
    bookings,
    activeBooking,

    // ============ QUERY STATES ============
    // Loading states
    isFetchingByOwner: ownerQuery.isFetching,
    isFetchingByCustomer: customerQuery.isFetching,
    isLoadingByOwner: ownerQuery.isLoading,
    isLoadingByCustomer: customerQuery.isLoading,

    // Success states
    ownerBookingsLoaded: ownerQuery.isSuccess,
    customerBookingsLoaded: customerQuery.isSuccess,

    // Error states
    fetchByOwnerError: ownerQuery.error,
    fetchByCustomerError: customerQuery.error,

    // Refetch functions
    refetchOwnerBookings: ownerQuery.refetch,
    refetchCustomerBookings: customerQuery.refetch,

    // ============ MUTATION STATES ============
    // Loading states
    isCreatingBooking: addBookingState.isLoading,
    isAcceptingBooking: acceptBookingState.isLoading,
    isCancelingByOwner: cancelByOwnerState.isLoading,
    isCancelingByCustomer: cancelByCustomerState.isLoading,
    isDeletingBooking: deleteBookingState.isLoading,

    // Success states
    bookingCreated: addBookingState.isSuccess,
    bookingAccepted: acceptBookingState.isSuccess,
    bookingCanceledByOwner: cancelByOwnerState.isSuccess,
    bookingCanceledByCustomer: cancelByCustomerState.isSuccess,
    bookingDeleted: deleteBookingState.isSuccess,

    // Error states
    createBookingError: addBookingState.error,
    acceptBookingError: acceptBookingState.error,
    cancelByOwnerError: cancelByOwnerState.error,
    cancelByCustomerError: cancelByCustomerState.error,
    deleteBookingError: deleteBookingState.error,

    // Reset functions
    resetCreateBooking: addBookingState.reset,
    resetAcceptBooking: acceptBookingState.reset,
    resetCancelByOwner: cancelByOwnerState.reset,
    resetCancelByCustomer: cancelByCustomerState.reset,
    resetDeleteBooking: deleteBookingState.reset,

    // ============ ACTIONS ============

    // ============ AVAILABILITY STATES ============
    isCheckingAvailability: availabilityState.isLoading,
    availabilityChecked: availabilityState.isSuccess,
    availabilityError: availabilityState.error,
    availabilityResult: availabilityState.data,
    refetchAvailability: availabilityState.refetch,

    createBooking,
    acceptBookingByOwner,
    cancelBookingOwner,
    cancelBookingCustomer,
    removeBooking,
    checkVenueAvailability,
  };
}
