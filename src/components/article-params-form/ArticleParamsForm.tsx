import { useState, useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import { useCloseOnOutsideClickOrEsc } from '../../hooks/useCloseOnOutsideClickOrEsc';

type ArticleParamsFormProps = {
	value: ArticleStateType;
	onChange: (next: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	value,
	onChange,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen((prev) => !prev);
	const sidebarRef = useRef<HTMLElement | null>(null);

	useCloseOnOutsideClickOrEsc(isOpen, () => setIsOpen(false), sidebarRef);

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		onApply();
	};

	const updateField = <K extends keyof ArticleStateType>(
		key: K,
		fieldValue: ArticleStateType[K]
	) => {
		onChange({ ...value, [key]: fieldValue });
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			{isOpen && (
				<aside
					ref={sidebarRef}
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
						<Text weight={800} size={31} uppercase>
							задайте параметры
						</Text>
						<Select
							selected={value.fontFamilyOption}
							options={fontFamilyOptions}
							title={'шрифт'}
							onChange={(opt) => updateField('fontFamilyOption', opt)}
						/>
						<RadioGroup
							name='font-size'
							options={fontSizeOptions}
							selected={value.fontSizeOption}
							title={'размер шрифта'}
							onChange={(opt) => updateField('fontSizeOption', opt)}
						/>
						<Select
							selected={value.fontColor}
							options={fontColors}
							title={'цвет шрифта'}
							onChange={(opt) => updateField('fontColor', opt)}
						/>
						<Separator />
						<Select
							selected={value.backgroundColor}
							options={backgroundColors}
							title={'цвет фона'}
							onChange={(opt) => updateField('backgroundColor', opt)}
						/>
						<Select
							selected={value.contentWidth}
							options={contentWidthArr}
							title={'ширина контента'}
							onChange={(opt) => updateField('contentWidth', opt)}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
