import { memo } from "react"

type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number | string
}

export const LightningIcon = memo(({ className, size = 24, ...props }: IconProps) => {
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
      <path d="M13 2L4.09 12.64C3.74 13.05 3.56 13.26 3.56 13.43C3.56 13.58 3.63 13.72 3.75 13.81C3.88 13.91 4.15 13.91 4.68 13.91H12L11 22L19.91 11.36C20.26 10.95 20.44 10.74 20.44 10.57C20.44 10.42 20.37 10.28 20.25 10.19C20.12 10.09 19.85 10.09 19.32 10.09H12L13 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
})

LightningIcon.displayName = "LightningIcon"
