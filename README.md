# @yieldstudio/react-query-factory

Our typesafe factories for [React Query](https://tanstack.com) protected by [Zod](https://zod.dev)

[![Latest Version](https://img.shields.io/github/release/yieldstudio/react-query-factory?style=flat-square)](https://github.com/yieldstudio/react-query-factory/releases)
[![Total Downloads](https://img.shields.io/npm/dt/@yieldstudio/react-query-factory?style=flat-square)](https://www.npmjs.com/package/@yieldstudio/react-query-factory)

## Getting Started

### Installation

You can install React Query via [NPM](https://npmjs.com)

```sh
yarn add --dev @yieldstudio/react-query-factory
```

### APIs

| API | Description |
| ----- | ----- |
| [createQuery](#createquery) | Create a QueryFunction used to create a React Query hook |
| [createMutation](#createmutation) | Create a MutationFunction used to create a React Query hook |
| setAxiosInstance | Use to provide a custom axios instance that will be used by factories |
| getAxiosInstance | Get the axios instance used by the factories |
| TypedFormData | Polyfill for FormData Generic |

### Quick Start

Create a client and provide him to your App

```tsx
import {
  QueryClient,
  QueryClientProvider,
  setAxiosInstance,
} from '@yieldstudio/react-query-factory';
import { axios } from "@utils/axios";

const queryClient = new QueryClient();

function App() {
  setAxiosInstance(axios); // optional

  return (
    <QueryClientProvider client={queryClient}>
      {/* my app */}
    </QueryClientProvider>
  );
}
```

#### createQuery

Create a React Query hook with our createQuery factory

```tsx
import { useQuery, createQuery } from '@yieldstudio/react-query-factory';
import { array, object, string } from 'zod';
import { QUERY_CACHE_KEY } from '@constants/QueryCacheKey';

const schema = object({
  data: array({
    id: string(),
    label: string(),
  }),
});

export const queryFn = createQuery(schema);

export function useTodosQuery() {
  const queryKey = QUERY_CACHE_KEY.todos.list());
  return useQuery({ queryKey, queryFn });
}
```

##### Usage

```tsx
const { data, isLoading, ... } = useTodosQuery();
// data -> { data: Array<{ id: string; label: string }> }
```

#### createMutation

Create a React Query mutation hook with our createMutation factory

```tsx
import { useMutation, createMutation } from '@yieldstudio/react-query-factory';
import { object, string } from 'zod';

const schema = object({
  id: string(),
  label: string(),
});

type OrderInput = {
  label: string;
};

const mutationFn = createMutation<OrderInput, typeof schema>('POST', '/v1/todos', schema);

export function useCreateTodoMutation() {
  return useMutation(mutationFn);
}

```

##### Usage

```tsx
const { mutateAsync } = useCreateTodoMutation();
const data = await mutateAsync({ label: 'my todo label' });
// data -> { id: string, label: string }
```

## Credits

Powered by [Yield Studio](https://www.yieldstudio.fr/) team members

- [James Hemery](https://github.com/jameshemery)
- [Julien Sanchez-Porro](https://github.com/qwisty)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
