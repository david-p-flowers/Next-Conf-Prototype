import { memo } from "react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
}

export const BookIcon = memo(({ className, size = 24, ...props }: IconProps) => {
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
        d="M6.5 3C5.11929 3 4 4.11929 4 5.5V18.5C4 19.8807 5.11929 21 6.5 21H19C19.5523 21 20 20.5523 20 20V4C20 3.44772 19.5523 3 19 3H6.5ZM6 5.5C6 5.22386 6.22386 5 6.5 5H18V15H6.5C6.32885 15 6.16152 15.0172 6 15.0499V5.5ZM6.5 17C6.22386 17 6 17.2239 6 17.5V18.5C6 18.7761 6.22386 19 6.5 19H18V17H6.5Z"
        fill="currentColor"
      />
    </svg>
  )
})

BookIcon.displayName = "BookIcon"
