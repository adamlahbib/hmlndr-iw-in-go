import { useUser } from '../contexts/user'

export default function ProfileHeader() {
    const { user } = useUser()

    return (
        <div>
            <img
                src={user?.Cover || '/assets/images/cover.jpg'}
                alt="cover photo"
                className="h-56 w-full object-cover rounded-2xl"
            />
            <div className="px-4 lg:px-16 flex flex-col sm:flex-row">
                <img
                    src={
                        user?.Image ||
                        'https://api.dicebear.com/5.x/lorelei-neutral/svg?seed=' +
                            user?.Name +
                            '&radius=50'
                    }
                    alt="profile picture"
                    className={`mx-auto sm:mx-[unset] ring-[5px] ring-background relative rounded-full -top-14 w-48 h-48 object-cover ${
                        !user?.Image && 'border'
                    }`}
                />
                <div className="flex-1 py-4 flex flex-col lg:flex-row justify-between space-y-3 sm:space-y-0">
                    <div className="sm:pl-4">
                        <div className="flex flex-row justify-between lg:justify-start lg:flex-col space-y-3">
                            <div>
                                <h1 className="font-bold flex items-center space-x-2">
                                    <span className="text-2xl">
                                        {user?.Name}
                                    </span>
                                </h1>
                                <h2 className="font-medium text-xs">
                                    Known as {user?.Name}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div>{user?.Email}</div>
                    <div>ID: {user?.ID}</div>
                </div>
            </div>
        </div>
    )
}