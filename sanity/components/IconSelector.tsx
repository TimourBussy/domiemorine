import {useState, useMemo} from 'react'
import {set, unset} from 'sanity'
import {TextInput, Button, Flex, Box, Text, Grid, Card} from '@sanity/ui'
import {getIcon, iconsRegistry, socialIcons} from '../lib/iconsRegistry'

export function IconSelector(props: any) {
  const {value, onChange} = props
  const [searchTerm, setSearchTerm] = useState('')

  const filteredIcons = useMemo(() => {
    const cleanSearchTerm = searchTerm.replace(/\s/g, '')
    return !cleanSearchTerm
      ? socialIcons // If no search, show social icons only
      : iconsRegistry.filter((icon) => icon.toLowerCase().includes(cleanSearchTerm.toLowerCase())) // If searching, filter from all icons
  }, [searchTerm])

  const IconComponent = value ? getIcon(value) : null

  const handleSelect = (iconName: string) => {
    onChange(set(iconName))
  }

  const handleClear = () => {
    onChange(unset())
  }

  return (
    <Box padding={4}>
      <Flex direction="column" gap={3}>
        <Flex direction="column" gap={4}>
          <Text as="label" size={1} weight="semibold">
            Search Icons
          </Text>
          <TextInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            placeholder="Type to search an icon..."
          />
          {!searchTerm && (
            <Text size={0} style={{marginTop: '0.5rem', color: '#666'}}>
              Popular icons shown. Start typing to search all {iconsRegistry.length} available
              icons.
            </Text>
          )}
        </Flex>

        {value && (
          <Flex
            padding={4}
            align="center"
            gap={4}
            style={{border: '1px solid var(--card-border-color)', borderRadius: '4px'}}
          >
            {IconComponent && <IconComponent size={32} />}
            <Box>
              <Text size={1} weight="semibold">
                {value}
              </Text>
              <Button
                text="Clear"
                onClick={handleClear}
                mode="ghost"
                style={{marginTop: '0.5rem'}}
              />
            </Box>
          </Flex>
        )}

        <Grid
          gap={2}
          padding={4}
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid var(--card-border-color)',
            borderRadius: '4px',
          }}
        >
          {filteredIcons.length > 0 ? (
            filteredIcons.map((iconName) => {
              const Icon = getIcon(iconName)
              return (
                <Card
                  as="button"
                  key={iconName}
                  onClick={() => handleSelect(iconName)}
                  title={iconName}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    border:
                      value === iconName
                        ? '2px solid var(--card-focus-ring-color)'
                        : '1px solid var(--card-border-color)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {Icon && <Icon size={24} />}
                </Card>
              )
            })
          ) : (
            <Text style={{gridColumn: '1 / -1', padding: '1rem', color: '#999'}}>No icons found</Text>
          )}
        </Grid>

        <Text size={0}>
          Showing {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''}
          {searchTerm && ` (searched in ${iconsRegistry.length} total)`}
        </Text>
      </Flex>
    </Box>
  )
}
