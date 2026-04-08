import {useCallback} from 'react'
import {set, unset} from 'sanity'
import type {ObjectInputProps} from 'sanity'
import {useState} from 'react'
import {Text, Flex, Box, Grid, Heading} from '@sanity/ui'

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
    <Box style={{fontFamily: 'sans-serif', fontSize: 14}}>
      {/* Header */}
      <Flex align="center" gap={3} style={{marginBottom: 16}}>
        <button
          onClick={() => {
            if (currentMonth === 0) {
              setCurrentMonth(11)
              setCurrentYear((y) => y - 1)
            } else setCurrentMonth((m) => m - 1)
          }}
          style={btnStyle}
        >
          ‹
        </button>
        <strong style={{minWidth: 160, textAlign: 'center'}}>
          {MONTHS[currentMonth]} {currentYear}
        </strong>
        <button
          onClick={() => {
            if (currentMonth === 11) {
              setCurrentMonth(0)
              setCurrentYear((y) => y + 1)
            } else setCurrentMonth((m) => m + 1)
          }}
          style={btnStyle}
        >
          ›
        </button>
        <Flex gap={2} style={{marginLeft: 'auto'}}>
          <button
            onClick={() => setView('month')}
            style={{
              ...btnStyle,
              background: view === 'month' ? '#0070f3' : '#eee',
              color: view === 'month' ? '#e4e5e9' : '#333',
            }}
          >
            Month
          </button>
          <button
            onClick={() => setView('list')}
            style={{
              ...btnStyle,
              backgroundColor: view === 'list' ? '#0070f3' : '#eee',
              color: view === 'list' ? '#e4e5e9' : '#333',
            }}
          >
            List
          </button>
        </Flex>
      </Flex>

      {/* Month view */}
      {view === 'month' && (
        <>
          <Grid
            marginBottom={1}
            style={{
              gridTemplateColumns: 'repeat(7, 1fr)',
            }}
          >
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <Box
                key={d}
                paddingX={4}
                paddingY={1}
                style={{
                  textAlign: 'center',
                  fontWeight: 600,
                  color: '#888',
                  fontSize: 12,
                }}
              >
                {d}
              </Box>
            ))}
          </Grid>
          <Grid gap={1} style={{gridTemplateColumns: 'repeat(7, 1fr)'}}>
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
                  <Box
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
                    style={{
                      minHeight: 70,
                      border: isToday ? '2px solid #0070f3' : '1px solid #e0e0e0',
                      borderRadius: 6,
                      cursor: 'pointer',
                      backgroundColor: '#191a24',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#21232F')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#191A24')}
                  >
                    <Box
                      style={{
                        fontWeight: isToday ? 700 : 400,
                        color: isToday ? '#0070f3' : '#e4e5e9',
                        fontSize: 13,
                      }}
                    >
                      {day}
                    </Box>
                    {(eventsByDay[day] || []).map((ev) => (
                      <Box
                        key={ev._key}
                        onClick={(e) => {
                          e.stopPropagation()
                          openEdit(ev)
                        }}
                        paddingX={1}
                        paddingY={2}
                        marginTop={2}
                        overflow="hidden"
                        style={{
                          backgroundColor: '#0070f3',
                          color: '#e4e5e9',
                          borderRadius: 3,
                          fontSize: 11,
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          cursor: 'pointer',
                        }}
                      >
                        {ev.time && `${ev.time} `}
                        {ev.titleFR || ev.titleEN}
                      </Box>
                    ))}
                  </Box>
                )
              },
            )}
          </Grid>
        </>
      )}

      {/* List view */}
      {view === 'list' && (
        <Flex direction="column" gap={2}>
          {sortedEvents.length === 0 && <Text color="#888">No events.</Text>}
          {sortedEvents.map((ev) => (
            <Flex
              key={ev._key}
              onClick={() => openEdit(ev)}
              align="center"
              style={{
                gap: 12,
                padding: '10px 14px',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                cursor: 'pointer',
                background: '#191a24',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#21232F')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#191A24')}
            >
              <Flex
                paddingX={2}
                paddingTop={2}
                paddingBottom={3}
                direction="column"
                gap={1}
                style={{
                  minWidth: 52,
                  textAlign: 'center',
                  background: '#0070f3',
                  color: '#e4e5e9',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {new Date(ev.date).getDate()}
                <br />
                <Text style={{fontSize: 10, fontWeight: 400}}>
                  {MONTHS[new Date(ev.date).getMonth()].slice(0, 3)}
                </Text>
              </Flex>
              <Flex flex={1} direction="column" gap={2}>
                <Text weight="semibold" style={{color: '#e4e5e9'}}>
                  {ev.titleFR} / {ev.titleEN}
                </Text>
                <Text style={{color: '#979cb0', fontSize: 12}}>
                  {ev.time && `${ev.time}`}
                  {ev.location && ` — ${ev.location}`}
                </Text>
              </Flex>
            </Flex>
          ))}
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
            zIndex: 9999,
          }}
        >
          <Box
            padding={5}
            style={{
              background: '#13141b',
              border: '1px solid #2a2d3f',
              borderRadius: 12,
              width: 420,
              maxWidth: '95vw',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            <Heading size={1} style={{marginBottom: 16}}>
              {modal.mode === 'add' ? 'New Event' : 'Modify Event'}
            </Heading>
            <Flex style={{display: 'flex', flexDirection: 'column', gap: 10}}>
              <input
                placeholder="Title (FR) *"
                value={modal.form.titleFR}
                onChange={(e) =>
                  setModal({...modal, form: {...modal.form, titleFR: e.target.value}})
                }
                style={{...inputStyle, color: '#e4e5e9'}}
              />
              <input
                placeholder="Title (EN)"
                value={modal.form.titleEN}
                onChange={(e) =>
                  setModal({...modal, form: {...modal.form, titleEN: e.target.value}})
                }
                style={{...inputStyle, color: '#e4e5e9'}}
              />
              <Flex gap={2}>
                <input
                  type="date"
                  value={modal.form.date}
                  onChange={(e) =>
                    setModal({...modal, form: {...modal.form, date: e.target.value}})
                  }
                  style={{...inputStyle, color: '#e4e5e9', flex: 1}}
                />
                <input
                  type="time"
                  value={modal.form.time}
                  onChange={(e) =>
                    setModal({...modal, form: {...modal.form, time: e.target.value}})
                  }
                  style={{...inputStyle, color: '#e4e5e9', flex: 1}}
                />
              </Flex>
              <input
                placeholder="Lieu"
                value={modal.form.location}
                onChange={(e) =>
                  setModal({...modal, form: {...modal.form, location: e.target.value}})
                }
                style={{...inputStyle, color: '#e4e5e9'}}
              />
            </Flex>
            <Flex gap={2} justify="flex-end" style={{marginTop: 20}}>
              {modal.mode === 'edit' && (
                <button
                  onClick={() =>
                    modal.key &&
                    ((key: string) => {
                      saveEvents(events.filter((e) => e._key !== key))
                      setModal(null)
                    })(modal.key)
                  }
                  style={{...btnStyle, background: '#fee2e2', color: '#dc2626'}}
                >
                  Supprimer
                </button>
              )}
              <button
                onClick={() => setModal(null)}
                style={{...btnStyle, background: '#eee', color: '#333'}}
              >
                Annuler
              </button>
              <button
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
                style={{
                  ...btnStyle,
                  background: '#0070f3',
                  color: '#e4e5e9',
                  opacity: !modal.form.titleFR || !modal.form.date ? 0.5 : 1,
                }}
              >
                Sauvegarder
              </button>
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  )
}

const btnStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: 13,
}

const inputStyle: React.CSSProperties = {
  padding: '8px 10px',
  borderRadius: 6,
  border: '1px solid #ddd',
  fontSize: 14,
  width: '100%',
  boxSizing: 'border-box',
  backgroundColor: 'inherit',
}
