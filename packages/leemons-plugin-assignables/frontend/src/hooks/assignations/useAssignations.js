import { useQueries } from 'react-query';
import getAssignation from '../../requests/assignations/getAssignation';

export default function useAssignations(instances, details = true) {
  const _instances = (Array.isArray(instances) ? instances : [instances])?.filter(Boolean);
  const queries = useQueries(
    _instances?.map(({ instance, user }) => ({
      queryKey: ['assignations', { instance, user, details }],
      queryFn: () => getAssignation({ id: instance, user, details }),
    })) || []
  );

  if (Array.isArray(instances)) {
    return queries;
  }
  return queries[0];
}
