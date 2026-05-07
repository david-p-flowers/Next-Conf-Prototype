import { memo } from "react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
}

export const SearchIcon = memo(({ className, size = 24, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M17.5 17.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
})

SearchIcon.displayName = "SearchIcon"
