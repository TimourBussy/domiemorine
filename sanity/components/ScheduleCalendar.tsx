import {useCallback} from 'react'
import {set, unset} from 'sanity'
import type {ObjectInputProps} from 'sanity'
import {useState} from 'react'
import {Text, Flex, Box, Grid, Heading, Card, Button, TextInput} from '@sanity/ui'

interface ScheduleEvent {
  _key: string
  titleFR: string
  titleEN: string
  date: string
  time: string
  location: string
}

interface EventFormState {
  titleFR: string
  titleEN: string
  date: string
  time: string
  location: string
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function ScheduleCalendarInput(props: ObjectInputProps) {
  const {value, onChange} = props

  const events: ScheduleEvent[] = (value as any)?.events || []

  const today = new Date()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [view, setView] = useState<'month' | 'list'>('month')
  const [modal, setModal] = useState<{
    mode: 'add' | 'edit'
    form: EventFormState
    key?: string
  } | null>(null)

  const saveEvents = useCallback(
    (newEvents: ScheduleEvent[]) => {
      onChange(newEvents.length === 0 ? unset() : set({events: newEvents}))
    },
    [onChange],
  )

  const openEdit = (event: ScheduleEvent) => {
    setModal({
      mode: 'edit',
      key: event._key,
      form: {
        titleFR: event.titleFR,
        titleEN: event.titleEN,
        date: event.date,
        time: event.time,
        location: event.location,
      },
    })
  }

  const eventsByDay: Record<number, ScheduleEvent[]> = {}
  events
    .filter((e) => {
      const d = new Date(e.date)
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth
    })
    .forEach((e) => {
      const day = new Date(e.date).getDate()
      if (!eventsByDay[day]) eventsByDay[day] = []
      eventsByDay[day].push(e)
    })

  const sortedEvents = [...events]
    .filter((e) => {
      const d = new Date(e.date)
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <Card style={{fontFamily: 'sans-serif', fontSize: 14}}>
      {/* Header */}
      <Flex align="center" gap={3} style={{marginBottom: 16}}>
        <Button
          tone="primary"
          onClick={() => {
            if (currentMonth === 0) {
              setCurrentMonth(11)
              setCurrentYear((y) => y - 1)
            } else setCurrentMonth((m) => m - 1)
          }}
          style={btnStyle}
        >
          ‹
        </Button>
        <strong style={{minWidth: 160, textAlign: 'center'}}>
          {MONTHS[currentMonth]} {currentYear}
        </strong>
        <Button
          tone="primary"
          onClick={() => {
            if (currentMonth === 11) {
              setCurrentMonth(0)
              setCurrentYear((y) => y + 1)
            } else setCurrentMonth((m) => m + 1)
          }}
          style={btnStyle}
        >
          ›
        </Button>
        <Flex gap={2} style={{marginLeft: 'auto'}}>
          <Button
            tone={view === 'month' ? 'primary' : 'neutral'}
            onClick={() => setView('month')}
            style={btnStyle}
          >
            Month
          </Button>
          <Button
            tone={view === 'list' ? 'primary' : 'neutral'}
            onClick={() => setView('list')}
            style={btnStyle}
          >
            List
          </Button>
        </Flex>
      </Flex>

      {/* Month view */}
      {view === 'month' && (
        <>
          <Grid columns={7} marginBottom={1}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <Text
                key={d}
                align="center"
                weight="semibold"
                size={1}
                muted
                style={{
                  padding: '8px 0',
                }}
              >
                {d}
              </Text>
            ))}
          </Grid>
          <Grid gap={1} columns={7}>
            {Array.from({length: (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7}).map(
              (_, i) => (
                <Box key={`empty-${i}`} />
              ),
            )}
            {Array.from({length: new Date(currentYear, currentMonth + 1, 0).getDate()}).map(
              (_, i) => {
                const day = i + 1
                const isToday =
                  day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear()

                return (
                  <Card
                    as="button"
                    key={day}
                    onClick={() =>
                      ((date: string) => {
                        setModal({
                          mode: 'add',
                          form: {
                            ...{
                              titleFR: '',
                              titleEN: '',
                              date: '',
                              time: '',
                              location: '',
                            },
                            date,
                          },
                        })
                      })(
                        `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                      )
                    }
                    padding={1}
                    radius={2}
                    tone="primary"
                    style={{
                      minHeight: 70,
                      border: isToday ? '2px solid var(--card-focus-ring-color)' : undefined,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Text
                      size={1}
                      weight={isToday ? 'semibold' : 'regular'}
                      style={{
                        color: isToday ? 'var(--card-focus-ring-color)' : undefined,
                      }}
                    >
                      {day}
                    </Text>
                    {(eventsByDay[day] || []).map((ev) => (
                      <Text
                        key={ev._key}
                        onClick={(e) => {
                          e.stopPropagation()
                          openEdit(ev)
                        }}
                        textOverflow="ellipsis"
                        size={0}
                        style={{
                          display: 'flex',
                          backgroundColor: 'var(--card-focus-ring-color)',
                          color: '#fff',
                          borderRadius: 3,
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                          width: '75%',
                          height: 16,
                          margin: '6px auto',
                          padding: '6px',
                          overflow: 'hidden',
                        }}
                      >
                        {ev.time && `${ev.time} `}
                        {ev.titleFR || ev.titleEN}
                      </Text>
                    ))}
                  </Card>
                )
              },
            )}
          </Grid>
        </>
      )}

      {/* List view */}
      {view === 'list' && (
        <Flex direction="column" gap={2}>
          {sortedEvents.length === 0 ? (
            <Text>No events.</Text>
          ) : (
            sortedEvents.map((ev) => (
              <Card
                as="button"
                key={ev._key}
                onClick={() => openEdit(ev)}
                tone="primary"
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  padding: '10px 14px',
                  border: '1px solid var(--card-border-color)',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                <Flex
                  paddingX={2}
                  paddingTop={2}
                  paddingBottom={3}
                  direction="column"
                  align="center"
                  size={1}
                  gap={2}
                  style={{
                    minWidth: 52,
                    background: '#0070f3',
                    color: '#ffffff',
                    borderRadius: 6,
                  }}
                >
                  <Text style={{color: '#ffffff'}}>{new Date(ev.date).getDate()}</Text>
                  <Text style={{fontSize: 10, fontWeight: 400, color: '#ffffff'}}>
                    {MONTHS[new Date(ev.date).getMonth()].slice(0, 3)}
                  </Text>
                </Flex>
                <Flex direction="column" gap={2}>
                  <Text weight="semibold">
                    {ev.titleFR} / {ev.titleEN}
                  </Text>
                  <Text size={1} muted>
                    {ev.time && `${ev.time}`}
                    {ev.location && ` — ${ev.location}`}
                  </Text>
                </Flex>
              </Card>
            ))
          )}
        </Flex>
      )}

      {/* Modal */}
      {modal && (
        <Flex
          align="center"
          justify="center"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 99999,
          }}
        >
          <Card padding={5} radius={3} shadow={3} style={{width: 420, maxWidth: '95vw'}}>
            <Heading size={1} style={{marginBottom: 16}}>
              {modal.mode === 'add' ? 'New Event' : 'Modify Event'}
            </Heading>
            <Flex direction="column" style={{gap: 10}}>
              <TextInput
                placeholder="Title (FR) *"
                value={modal.form.titleFR}
                onChange={(e) =>
                  setModal({...modal, form: {...modal.form, titleFR: e.target.value}})
                }
              />
              <TextInput
                placeholder="Title (EN)"
                value={modal.form.titleEN}
                onChange={(e) =>
                  setModal({...modal, form: {...modal.form, titleEN: e.target.value}})
                }
              />
              <Flex gap={2}>
                <TextInput
                  type="date"
                  value={modal.form.date}
                  onChange={(e) =>
                    setModal({...modal, form: {...modal.form, date: e.target.value}})
                  }
                />
                <TextInput
                  type="time"
                  value={modal.form.time}
                  onChange={(e) =>
                    setModal({...modal, form: {...modal.form, time: e.target.value}})
                  }
                />
              </Flex>
              <TextInput
                placeholder="Location"
                value={modal.form.location}
                onChange={(e) =>
                  setModal({...modal, form: {...modal.form, location: e.target.value}})
                }
              />
            </Flex>
            <Flex gap={2} justify="flex-end" style={{marginTop: 20}}>
              {modal.mode === 'edit' && (
                <Button
                  tone="critical"
                  onClick={() =>
                    modal.key &&
                    (() => {
                      saveEvents(events.filter((e) => e._key !== modal.key))
                      setModal(null)
                    })()
                  }
                >
                  Supprimer
                </Button>
              )}
              <Button
                tone="neutral"
                onClick={() => setModal(null)}
              >
                Annuler
              </Button>
              <Button
                tone="positive"
                onClick={() => {
                  if (!modal) return
                  const {form, mode, key} = modal
                  if (!form.titleFR || !form.date) return
                  if (mode === 'add') {
                    saveEvents([...events, {...form, _key: Math.random().toString(36).slice(2, 9)}])
                  } else {
                    saveEvents(events.map((e) => (e._key === key ? {...e, ...form} : e)))
                  }
                  setModal(null)
                }}
                disabled={!modal.form.titleFR || !modal.form.date}
              >
                Sauvegarder
              </Button>
            </Flex>
          </Card>
        </Flex>
      )}
    </Card>
  )
}

const btnStyle: React.CSSProperties = {
  height: 28,
  borderRadius: 6,
  cursor: 'pointer',
}
