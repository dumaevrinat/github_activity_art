import React, {useContext} from 'react'
import Context from '../../context'
import ColorPalette from "../ColorPalette/ColorPalette";
import {useTranslation} from "react-i18next";

export default function Settings({selectedType, colors, maxCommitCount, selectedOS, startDate, selectedDate}) {
    const {setMaxCommitCount, setSelectedOS} = useContext(Context);

    const { t } = useTranslation();

    return (
        <div className='block settings'>
            <div className='settings_item'>
                <div className='settingsDescription'>
                    {t('settings color')}
                </div>

                <ColorPalette
                    colors={colors}
                    selectedType={selectedType}
                />
            </div>

            <div className='settings_item'>
                <div className='settingsDescription'>
                    {t('settings max commit count')}
                </div>

                <input
                    className='maxCommitInput'
                    type='number'
                    defaultValue={maxCommitCount}
                    max={100}
                    min={10}
                    step={1}
                    onInput={(event) => setMaxCommitCount(event.target.value)}
                />
            </div>

            <div className='settings_item'>
                <div className='settingsDescription'>
                    {t('settings operating system')}
                </div>

                <select
                    value={selectedOS}
                    className='OSSelect'
                    onChange={(event) => setSelectedOS(parseInt(event.target.value))}
                >
                    <option value={0}>windows</option>
                    <option value={1}>linux & macos</option>
                </select>
            </div>

            <div className='settings_item dateSettings'>
                <div className='date'>
                    <div className='settingsDescription'>
                        {t('settings start date')}
                    </div>

                    <div className='dateValue'>
                        {startDate.toLocaleDateString()}
                    </div>
                </div>

                <div className='date'>
                    <div className='settingsDescription'>
                        {t('settings selected date')}
                    </div>

                    <div className='dateValue'>
                        {selectedDate ? selectedDate.toLocaleDateString() : '...'}
                    </div>
                </div>
            </div>
        </div>
    )
}