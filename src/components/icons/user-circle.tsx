import { memo } from "react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
}

export const UserCircleIcon = memo(({ className, size = 24, ...props }: IconProps) => {
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C7.02944 3 3 7.02944 3 12C3 14.4264 3.96586 16.6237 5.54274 18.2283C6.60298 16.8628 8.19477 16 10 16H14C15.8052 16 17.397 16.8628 18.4573 18.2283C20.0341 16.6237 21 14.4264 21 12C21 7.02944 16.9706 3 12 3ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
        fill="currentColor"
      />
    </svg>
  )
})

UserCircleIcon.displayName = "UserCircleIcon"
