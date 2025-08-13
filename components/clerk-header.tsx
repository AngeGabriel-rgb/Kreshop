import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export function ClerkHeader() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16 bg-beige-creme border-b border-gray-200">
      <SignedOut>
        <SignInButton>
          <button className="bg-corail-intensifie text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-corail-doux transition-colors">
            Se connecter
          </button>
        </SignInButton>
        <SignUpButton>
          <button className="bg-brun-chocolat text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-gray-700 transition-colors">
            S'inscrire
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton 
          appearance={{
            elements: {
              userButtonAvatarBox: "w-10 h-10 sm:w-12 sm:h-12",
              userButtonTrigger: "focus:shadow-none",
            }
          }}
        />
      </SignedIn>
    </header>
  )
}
