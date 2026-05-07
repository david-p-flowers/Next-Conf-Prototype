import { memo } from "react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
}

export const CircleInfoIcon = memo(({ className, size = 24, ...props }: IconProps) => {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 2.90001C6.97431 2.90001 2.9001 6.97421 2.9001 12C2.9001 17.0258 6.97431 21.1 12.0001 21.1C17.0259 21.1 21.1001 17.0258 21.1001 12C21.1001 6.97421 17.0259 2.90001 12.0001 2.90001ZM1.1001 12C1.1001 5.9801 5.98019 1.10001 12.0001 1.10001C18.02 1.10001 22.9001 5.9801 22.9001 12C22.9001 18.0199 18.02 22.9 12.0001 22.9C5.98019 22.9 1.1001 18.0199 1.1001 12ZM10.6001 8.00001C10.6001 7.22681 11.2269 6.60001 12.0001 6.60001C12.7733 6.60001 13.4001 7.22681 13.4001 8.00001C13.4001 8.7732 12.7733 9.40001 12.0001 9.40001C11.2269 9.40001 10.6001 8.7732 10.6001 8.00001ZM12.0001 10.1C12.4972 10.1 12.9001 10.5029 12.9001 11V16C12.9001 16.4971 12.4972 16.9 12.0001 16.9C11.503 16.9 11.1001 16.4971 11.1001 16V11C11.1001 10.5029 11.503 10.1 12.0001 10.1Z" fill="currentColor"/>
    </svg>
  )
})

CircleInfoIcon.displayName = "CircleInfoIcon"
