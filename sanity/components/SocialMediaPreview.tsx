import {PreviewProps} from 'sanity'

interface SocialMediaPreviewProps extends PreviewProps {
  name?: string
  icon?: string
}

export function SocialMediaPreview(props: SocialMediaPreviewProps) {
  const {name, icon} = props

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem'}}>
      <div
        style={{
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '2px',
          backgroundColor: icon ? '#f0f7ff' : '#f5f5f5',
          border: icon ? '1px solid #0066cc' : '1px dashed #ccc',
          color: '#666',
          fontSize: '0.75rem',
          fontWeight: 500,
          flexShrink: 0,
        }}
      >
        {icon ? icon.substring(0, 2) : '?'}
      </div>
      <div style={{minWidth: 0}}>
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name || 'Unnamed'}
        </div>
        {icon && (
          <div
            style={{
              fontSize: '0.75rem',
              color: '#666',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

