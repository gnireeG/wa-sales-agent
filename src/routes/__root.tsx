import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import { MutationCache, QueryClient, QueryClientProvider, type QueryKey } from '@tanstack/react-query'
import { TooltipProvider } from '#/components/ui/tooltip'

import { getSession } from '@/lib/auth.functions'
import { Toaster } from '#/components/ui/sonner'
import { toast } from 'sonner'

declare module "@tanstack/react-query"{
  interface Register {
    mutationMeta: {
      invalidates?: QueryKey,
      successMessage?: string,
      errorMessage?: string
    }
  }
}

interface MyRouterContext {
  queryClient: QueryClient
}

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _onMutateResult, mutation) => {
      if(mutation.meta?.successMessage){
        toast.success(mutation.meta.successMessage)
      }
    },
    onError: (_data, _variables, _onMutateResult, mutation) => {
      if(mutation.meta?.errorMessage){
        toast.error(mutation.meta.errorMessage)
      }
    },
    onSettled: (_data, _error, _variables, _onMutateResult, mutation) => {
      if(mutation.meta?.invalidates){
        queryClient.invalidateQueries({ queryKey: mutation.meta.invalidates })
      }
    }
  })
})

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.fetchQuery({
      queryKey: ['session'],
      queryFn: () => getSession(),
      staleTime: 30_000,
    });

    const user = session ? session.user : null;

    return { user, session };
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning >
      <head suppressHydrationWarning>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <TooltipProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
          </QueryClientProvider>
        </TooltipProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
