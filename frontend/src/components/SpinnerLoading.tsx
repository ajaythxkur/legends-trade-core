export default function SpinnerLoading() {
    return (
        <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-15 w-15 border-b-2 border-primary-button-border-color"></div>
        </div>
    )
}