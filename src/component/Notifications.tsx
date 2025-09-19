import { useAppContext } from '../context/AppContext'
import { ButtonComponent } from './ButtonComponent'

/**
 * Notifications Component
 * 
 * Displays toast notifications from the global app context.
 * Notifications auto-dismiss after a timeout and can be manually closed.
 */
export function Notifications() {
  const { state, removeNotification } = useAppContext()

  if (state.notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {state.notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg border transform transition-all duration-300 ease-in-out ${
            notification.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200'
              : notification.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200'
              : notification.type === 'warning'
              ? 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200'
              : 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2">
              <span className="text-lg">
                {notification.type === 'success' && '✅'}
                {notification.type === 'error' && '❌'}
                {notification.type === 'warning' && '⚠️'}
                {notification.type === 'info' && 'ℹ️'}
              </span>
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <ButtonComponent
              variant="secondary"
              size="small"
              onClick={() => removeNotification(notification.id)}
              className="ml-2 p-1 min-w-0 h-6 w-6 rounded-full flex items-center justify-center"
            >
              ×
            </ButtonComponent>
          </div>
        </div>
      ))}
    </div>
  )
}