import React, {useContext} from 'react'
import Context from '../../context'
import ColorPalette from "../ColorPalette/ColorPalette";

export default function Settings({selectedType, colors, maxCommitCount, selectedOS, startDate, selectedDate}) {
    const {setMaxCommitCount, setSelectedOS} = useContext(Context);

    return (
        <div className='block settings'>
            <div className='colorSettings'>
                <ColorPalette
                    colors={colors}
                    selectedType={selectedType}
                />

                <div className='settingsDescription'>
                    Цвет
                </div>
            </div>

            <div className='maxCommitSettings'>
                <input
                    className='maxCommitInput'
                    type='number'
                    defaultValue={maxCommitCount}
                    max={100}
                    min={10}
                    step={1}
                    onInput={(event) => setMaxCommitCount(event.target.value)}
                />
                <div className='settingsDescription'>
                    Максимальное кол-во коммитов
                </div>
            </div>

            <div className='OSSettings'>
                <select
                    value={selectedOS}
                    className='OSSelect'
                    onChange={(event) => setSelectedOS(parseInt(event.target.value))}
                >
                    <option value={0}>windows</option>
                    <option value={1}>linux & macos</option>
                </select>
                <div className='settingsDescription'>
                    Операционная система
                </div>
            </div>

            <div className='dateSettings'>
                <div className='date'>
                    <div className='dateValue'>
                        {startDate.toLocaleDateString()}
                    </div>
                    <div className='settingsDescription'>
                        Начальная дата
                    </div>
                </div>

                <div className='date'>
                    <div className='dateValue'>
                        {selectedDate ? selectedDate.toLocaleDateString() : '...'}
                    </div>
                    <div className='settingsDescription'>
                        Выбранная дата
                    </div>
                </div>
            </div>
        </div>
    )
}