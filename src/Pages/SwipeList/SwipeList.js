import React, {useState, useEffect} from 'react';

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type as ListType,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import '../../assets/css/styleList.css';




const Svg = props => (
    <svg
        height="100%"
        viewBox="0 0 24 24"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    />
);
const DeleteIcon = () => (
    <Svg>
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
    </Svg>
);
const colors = {
    accepted: '#4a7b2b',
    deleted: '#bc281e',
    rejected: '#ba772b',
    waitlist: '#296690',
};
const Datapeople = [
    {
        id: 0,
        name: 'John',
        info: "John's info",
        avatar: './logo192.png',
        status: 'pending',
    },
    {
        id: 1,
        name: 'Sarah',
        info: "Sarah's info",
        avatar: './logo192.png',
        status: 'pending',
    },
    {
        id: 2,
        name: 'Adam',
        info: "Adam's info",
        avatar: './logo192.png',
        status: 'pending',
    },
    {
        id: 3,
        name: 'Jaqueline',
        info: "Jaqueline's info",
        avatar: './logo192.png',
        status: 'pending',
    },
];

const WithOneAction = (props) => {
    // React.useEffect(() => {
    //     setThreshold(0.5);
    // }, [setThreshold]);


    const [people, setPeople] = React.useState(Datapeople);
    const [fullSwipe, setFullSwipe] = React.useState(false);
    const [threshold, setThreshold] = React.useState(0.5);
    const [swipeProgress, setSwipeProgress] = React.useState(0);
    const [swipeAction, setSwipeAction] = React.useState();
    const [triggeredItemAction, setTriggeredItemAction] = React.useState('None');

    const setStatus = (id, status) => {
        setPeople(
            people.map(person => (person.id === id ? { ...person, status } : person))
        );
    };
    const handleSwipeStart = () => {
        setSwipeAction('Swipe started');
        setTriggeredItemAction('None');
    };

    const handleSwipeEnd = () => {
        setSwipeAction('Swipe ended');
        setSwipeProgress();
    };

    const handleAccept = id => () => {
        console.log('[Handle ACCEPT]', id);
        setTriggeredItemAction(`[Handle ACCEPT] - ${id}`);
        setStatus(id, 'accepted');
    };

    const handleDelete = id => () => {
        console.log('[Handle DELETE]', id);
        setTriggeredItemAction(`[Handle DELETE] - ${id}`);
        setPeople(people.filter(person => person.id !== id));
    };

    const leadingActions = ({id}) => (
        <LeadingActions>
            <SwipeAction onClick={handleAccept(id)}>
                <div className='ActionContent' style={{backgroundColor: colors.accepted}}>
                    Accept
                </div>
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = ({id}) => (
        <TrailingActions>
            <SwipeAction destructive={true} onClick={handleDelete(id)}>
                <div className='ActionContent' style={{backgroundColor: colors.deleted}}>
                    <div className='ItemColumnCentered'>
            <span className="icon">
              <DeleteIcon/>
            </span>
                        Delete
                    </div>
                </div>
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <div className="basic-swipeable-list__container">
            <SwipeableList
                fullSwipe={fullSwipe}
                style={{backgroundColor: '#555878'}}
                threshold={threshold}
                type={ListType.IOS}
            >
                {people.map(({avatar, id, name, info, status}) => (
                    <SwipeableListItem
                        key={id}
                        leadingActions={leadingActions({id})}
                        trailingActions={trailingActions({id})}
                        onSwipeEnd={handleSwipeEnd}
                        onSwipeProgress={setSwipeProgress}
                        onSwipeStart={handleSwipeStart}
                    >
                        <div className='ItemContent'>
                            <div className='ItemRow'>
                                <img className='AvatarImg' alt="avatar" src={avatar}/>
                                <div className='ItemColumn'>
                                    <span className='ItemNameLineSpan'>{name}</span>
                                    <span className='ItemInfoLineSpan'>
                                        {info}{' '}
                                        <span
                                            style={{
                                                backgroundColor: colors[status] || 'transparent',
                                            }}
                                        >
                      ({status})
                    </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </SwipeableListItem>
                ))}
            </SwipeableList>
        </div>
    );
};

export default WithOneAction;
