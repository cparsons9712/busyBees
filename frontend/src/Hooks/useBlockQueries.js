import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../APIs/blocks";
import { useModal } from "../Context/Modal";

export const useActiveBlocks = () => {
  const fetchActiveBlock = async () => {
    const response = await axios.get("/active", { withCredentials: true });
    return response.data;
  };


  // Using a more descriptive query key and returning all relevant data and states.
  const {
    data: currBlock,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["activeBlocks"],
    queryFn: fetchActiveBlock,
  });

  // Return these values so your components can use them.
  return { currBlock, isError, isLoading, error };
};

export const useBlockById = (id) => {
  const fetchBlockbyId = async () => {
    const response = await axios.get(`/${id}`, { withCredentials: true });
    return response.data;
  };


  // Using a more descriptive query key and returning all relevant data and states.
  const {
    data: block,
    isError,
    isLoading,
    error,
  } = useQuery(
    ["block", id],
    fetchBlockbyId,
    { enabled: typeof id === 'number' && !isNaN(id)});

  // Return these values so your components can use them.
  return { block, isError, isLoading, error };
};


export const useAllBlocks = () => {
  const fetchAllBlocks = async () => {
    const response = await axios.get("/", { withCredentials: true });
    return response.data;
  };

  const {
    data: allBlocks,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allBlocks"],
    queryFn: fetchAllBlocks,
  });

  return { allBlocks, isError, isLoading, error };
};

export const useBlocksByDay = (dayOfWeek) => {
  const fetchBlocksbyDay = async () => {
    const response = await axios.get(`/day/${dayOfWeek}`, {
      withCredentials: true,
    });
    return response.data;
  };

  const {
    data: blocks,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dayBlocks", dayOfWeek],
    queryFn: fetchBlocksbyDay,
  });

  return { blocks, isError, isLoading, error };
};

export const useEditBlock = () => {
  const queryClient = useQueryClient();
  const { hideModal } = useModal();

  const fetchEditBlock = async ({ id, payload }) => {
    try {
      const response = await axios.put(`/${id}`, payload, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            "An error occurred while updating the block."
        );
      } else if (error.request) {
        throw new Error(
          "No response was received when attempting to update the block."
        );
      } else {
        throw new Error(
          "An error occurred while setting up the request to update the block."
        );
      }
    }
  };

  const mutation = useMutation(fetchEditBlock, {
    onSuccess: () => {
      queryClient.invalidateQueries(["activeBlocks"]);
      queryClient.invalidateQueries(["allBlocks"]);
      queryClient.invalidateQueries(["dayBlocks"]);
      queryClient.invalidateQueries(["dayBlocks"]);
      hideModal();
    },
  });

  return mutation;
};

export const useCreateBlock = () => {
  const queryClient = useQueryClient();
  const { hideModal } = useModal();

  const fetchCreateBlock = async ({ payload }) => {
    try {
      const response = await axios.post(`/`, payload, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            "An error occurred while creating the block."
        );
      } else if (error.request) {
        throw new Error(
          "No response was received when attempting to create the block."
        );
      } else {
        throw new Error(
          "An error occurred while setting up the request to create the block."
        );
      }
    }
  };

  const mutation = useMutation(fetchCreateBlock, {
    onSuccess: () => {
      queryClient.invalidateQueries(["activeBlocks"]);
      queryClient.invalidateQueries(["allBlocks"]);
      queryClient.invalidateQueries(["dayBlocks"]);
      hideModal();
    },
  });

  return mutation;
};

export const useDeleteBlock = () => {
  const queryClient = useQueryClient();
  const { hideModal } = useModal();

  const fetchDeleteBlock = async ({ id }) => {
    try {
      const response = await axios.delete(`/${id}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            "An error occurred while deleting the block."
        );
      } else if (error.request) {
        throw new Error(
          "No response was received when attempting to delete the block."
        );
      } else {
        console.error("Error", error.message);
        throw new Error(
          "An error occurred while setting up the request to delete the block."
        );
      }
    }
  };

  const mutation = useMutation(fetchDeleteBlock, {
    onSuccess: () => {
      queryClient.invalidateQueries(["activeBlocks"]);
      queryClient.invalidateQueries(["allBlocks"]);
      queryClient.invalidateQueries(["dayBlocks"]);
      hideModal();
    },
  });

  return mutation;
};
