import { memo } from "react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
}

export const ArrowUpRightIcon = memo(({ className, size = 24, ...props }: IconProps) => {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M8.09961 4.00001C8.09961 3.50295 8.50255 3.10001 8.99961 3.10001H19.9996C20.4967 3.10001 20.8996 3.50295 20.8996 4.00001V15C20.8996 15.4971 20.4967 15.9 19.9996 15.9C19.5026 15.9 19.0996 15.4971 19.0996 15V6.1728L4.63601 20.6364C4.28453 20.9879 3.71469 20.9879 3.36321 20.6364C3.01174 20.2849 3.01174 19.7151 3.36321 19.3636L17.8268 4.90001H8.99961C8.50255 4.90001 8.09961 4.49706 8.09961 4.00001Z" fill="currentColor"/>
    </svg>
  )
})

ArrowUpRightIcon.displayName = "ArrowUpRightIcon"
