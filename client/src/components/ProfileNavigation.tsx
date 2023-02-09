import { useCallback } from 'react'
import { useCurrentRoute } from './hooks'
import { Button } from './UI'

export default function ProfileNavigation() {
  const isCurrentRoute = useCurrentRoute()

  const linkStyle = useCallback(
    (_route: string) => {
      return `${
        isCurrentRoute(_route) ? '!text-[#000]' : '!text-[#888]'
      } text-xs sm:text-base`
    },
    [isCurrentRoute]
  )

  return (
    <div>
      <div className="flex flex-wrap justify-center sm:justify-start py-4">
        <Button className={linkStyle('/dashboard')} href="/dashboard">
          About
        </Button>
        <Button
          className={linkStyle('/dashboard/invoices')}
          href="/dashboard/invoices"
        >
          All Invoices
        </Button>
        <Button
          className={linkStyle('/dashboard/unpaid')}
          href="/dashboard/unpaid"
        >
          Pay Pending Invoices
        </Button>
        <Button className={linkStyle('/dashboard/create')} href="/dashboard/create">
          Create Invoice
        </Button>

      </div>
      <hr />
    </div>
  )
}