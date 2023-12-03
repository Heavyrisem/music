import { Model, UserService } from '@music/types';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

import { edituserPreference } from '@/api/user';
import { useAuthStore } from '@/store/authStore';

interface UseEditUserPreferenceMutation {
  onSuccess?: (data: Model.UserInfo) => void;
}

export const useEditUserPreferenceMutation = ({
  onSuccess,
}: UseEditUserPreferenceMutation): UseMutationResult<
  Model.UserInfo,
  Error,
  UserService.EditUserPreferenceRequest,
  unknown
> => {
  const queryClient = useQueryClient();
  const { fetchUser } = useAuthStore();

  return useMutation({
    mutationKey: [edituserPreference.name],
    mutationFn: edituserPreference,
    onSuccess: (data) => {
      onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: [fetchUser.name] });
    },
  });
};
