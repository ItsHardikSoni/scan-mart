import type { JsonLdSchema } from '@/lib/seo/json-ld'

interface JsonLdProps {
  schema: JsonLdSchema | JsonLdSchema[]
}

/**
 * JSON-LD Component
 * Renders structured data scripts for SEO
 * Can accept a single schema or an array of schemas
 */
export function JsonLd({ schema }: JsonLdProps) {
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.map((s, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  )
}
