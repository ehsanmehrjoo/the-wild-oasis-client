import { auth } from "../_lib/auth"

export const metadata = {
  title: 'Guest area',
}

async function page() {
  const session = await auth()
  const firstName = session.user.name.split(" ").at(0)
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {vorname}
      </h2>
  )
}

export default page