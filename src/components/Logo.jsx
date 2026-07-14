export default function Logo({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#E88F00" />
      <path
        d="M20 8c-3.2 5-9 8.4-9 14.2A9 9 0 0 0 20 31a9 9 0 0 0 9-8.8C29 16.4 23.2 13 20 8z"
        fill="#F8E9D2"
      />
    </svg>
  )
}
