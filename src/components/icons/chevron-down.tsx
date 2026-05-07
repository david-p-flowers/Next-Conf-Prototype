import { memo } from "react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
}

export const ChevronDownIcon = memo(({ className, size = 24, ...props }: IconProps) => {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M5.3637 8.36358C5.71517 8.01211 6.28502 8.01211 6.63649 8.36358L12.0001 13.7272L17.3637 8.36358C17.7152 8.01211 18.285 8.01211 18.6365 8.36358C18.988 8.71505 18.988 9.2849 18.6365 9.63637L12.6365 15.6364C12.285 15.9878 11.7152 15.9878 11.3637 15.6364L5.3637 9.63637C5.01223 9.2849 5.01223 8.71505 5.3637 8.36358Z" fill="currentColor"/>
    </svg>
  )
})

ChevronDownIcon.displayName = "ChevronDownIcon"
