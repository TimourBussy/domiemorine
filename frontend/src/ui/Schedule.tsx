import {useTranslation} from 'react-i18next'
import {useSettings} from '../hooks/usePages'
import {Title} from './Title'
import {Event} from './Event'

export function Schedule() {
  const settings = useSettings()
  const {i18n} = useTranslation()

  if (!settings?.schedule?.events?.length) return null

  const now = new Date()

  const upcomingEvents = settings.schedule.events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastEvents = settings.schedule.events
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <section className="flex flex-col gap-6">
      {upcomingEvents.length > 0 && (
        <>
          <Title level={4} colored>
            {i18n.language === 'FR' ? 'Prochains concerts' : 'Upcoming concerts'}
          </Title>
          {upcomingEvents.map((event, index) => {
            return (
              <Event
                key={index}
                index={index}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                link={event.link}
              />
            )
          })}
        </>
      )}

      {pastEvents.length > 0 && (
        <>
          <Title level={4} className="text-gray-600">
            {i18n.language === 'FR' ? 'Concerts passés' : 'Past concerts'}
          </Title>
          {pastEvents.map((event, index) => {
            return (
              <Event
                key={index}
                index={index}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                link={event.link}
                colored={false}
              />
            )
          })}
        </>
      )}
    </section>
  )
}
