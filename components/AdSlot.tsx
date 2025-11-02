interface AdSlotProps {
  position: 'top' | 'bottom' | 'sidebar'
}

export default function AdSlot({ position }: AdSlotProps) {
  const heights = {
    top: 'h-24',
    bottom: 'h-24',
    sidebar: 'h-96',
  }

  return (
    <div className={`bg-gray-800 border border-gray-700 ${heights[position]} flex items-center justify-center my-4`}>
      <div className="text-gray-500 text-sm">
        広告スペース ({position})
        <div className="text-xs mt-1">ExoClick / TrafficJunky などを配置</div>
      </div>
    </div>
  )
}
