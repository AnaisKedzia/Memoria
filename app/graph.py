from datetime import datetime, timezone, timedelta
from plotly.graph_objs import Bar, Layout
from plotly import offline
import os

def process_decks(decks): 
    days = [[] for _ in range(8)]
    for name in decks : 
        deck = decks[name]
        sort_cards(deck, days)
    
    make_graph(days)


def sort_cards(deck, days):
    cards = list(deck["cards"]) + list(deck["review"])
    new_limit = deck["dailyLimit"]
    new_count = [0] * 8
    new_count[0] = deck["dailyReviewed"]
    for card in cards: 
        review = datetime.fromisoformat(card["reviewDate"].replace("Z", "+00:00"))
        today = datetime.now(timezone.utc)
        for day in range(8):
            if review.date() <= today.date() and card["status"] == "Familiar": 
                days[day].append(card)
                break
            elif review.date() <= today.date() and card["status"] == "New" and new_count[day] != new_limit:
                days[day].append(card)
                new_count[day] += 1
                break
            else: 
                today += timedelta(days=1)
                continue


def make_graph(days) : 
    x_values = ["Today", "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
    y_values = [len(cards) for cards in days]


    data= [Bar(x=x_values, y=y_values, marker={'color' : 'rgb(179,51,51)'})]
    my_layout = Layout(yaxis= {'title' : 'Card count'}, paper_bgcolor='rgb(250,242,232)', plot_bgcolor='rgb(250, 242, 232)')
    save_path = os.path.join(os.getcwd(), "app", "html", "review-forecast.html")


    offline.plot({'data': data, 'layout': my_layout}, filename=save_path, auto_open=False)

