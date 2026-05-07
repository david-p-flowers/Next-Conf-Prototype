import { memo } from "react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
}

export const ChevronRightIcon = memo(({ className, size = 24, ...props }: IconProps) => {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M9.36321 5.36358C9.71469 5.01211 10.2845 5.01211 10.636 5.36358L16.636 11.3636C16.9875 11.7151 16.9875 12.2849 16.636 12.6364L10.636 18.6364C10.2845 18.9878 9.71469 18.9878 9.36321 18.6364C9.01174 18.2849 9.01174 17.7151 9.36321 17.3636L14.7268 12L9.36321 6.63637C9.01174 6.2849 9.01174 5.71505 9.36321 5.36358Z" fill="currentColor"/>
    </svg>
  )
})

ChevronRightIcon.displayName = "ChevronRightIcon"
