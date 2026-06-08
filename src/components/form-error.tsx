import type { AnyFieldApi } from '@tanstack/react-form'

interface FormErrorProps {
  field: AnyFieldApi
}

export default function FormError({ field }: FormErrorProps) {
  if (!field.state.meta.isTouched || field.state.meta.errors.length === 0) return null

  return (
    <p className="text-sm text-destructive">
      {field.state.meta.errors
        .map((e) => (typeof e === 'string' ? e : e?.message))
        .join(', ')}
    </p>
  )
}
