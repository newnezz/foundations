import "./index.css";

// import { useEffect, useState } from 'react'

// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'
// import { createClient } from '@supabase/supabase-js'

// const supabase = createClient('https://cymccahfqxuoirpkxlkh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5bWNjYWhmcXh1b2lycGt4bGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzODE4MDMsImV4cCI6MjA0OTk1NzgwM30.RG3mYI5xOVrktwft3-76Gwh88ak0iY-SMw8JMq1UH90')

export default function App() {
  // const [session, setSession] = useState(null)
  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session)
  //   })
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session)
  //   })
  //   return () => subscription.unsubscribe()
  // }, [])
  // if (!session) {
  //   return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  // }
  // else {
  //   return (<div>Logged in! Access Token: {session.access_token}</div>)
  // }
}
