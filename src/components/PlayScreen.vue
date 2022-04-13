<template>
  <div class="play-screen" :class="{
    'play-screen--mode-selected': mode !== ''
  }">
    <div class="play-screen__options">
      <div class="play-screen__modes" :class="{
        'play-screen__modes--collapsed': mode !== ''
      }">
        <button class="play-screen__mode" @click="setMode('campaign')">
          <img src="/images/book.png" class="play-screen__mode__img" :class="mode === 'campaign' ? 'play-screen__mode__img--selected' : ''">
          <div class="play-screen__mode__title">Campaigns</div>
          <div class="play-screen__mode__description">Win the battle for Wesnoth and all the lands of Irdya</div>
        </button>
        <button class="play-screen__mode" @click="setMode('scenario')">
          <img src="/images/crossed_sword_and_hammer.png" class="play-screen__mode__img" :class="mode === 'scenario' ? 'play-screen__mode__img--selected' : ''">
          <div class="play-screen__mode__title">Scenarios</div>
          <div class="play-screen__mode__description">Challenge yourself with specially-designed maps and scenarios</div>
        </button>
        <button class="play-screen__mode" @click="setMode('multiplayer')">
          <img src="/images/icon-hotseat.png" class="play-screen__mode__img" :class="mode === 'multiplayer' ? 'play-screen__mode__img--selected' : ''">
          <div class="play-screen__mode__title">Multiplayer</div>
          <div class="play-screen__mode__description">Defeat your friends and enemies or join forces in cooperative play</div>
        </button>
        <button class="play-screen__mode" @click="alert('This would load the addons server')">
          <img src="/images/icon-editor.png" class="play-screen__mode__img" :class="mode === 'addon' ? 'play-screen__mode__img--selected' : ''">
          <div class="play-screen__mode__title">Addons</div>
          <div class="play-screen__mode__description">Download new units, maps, scenarios and campaigns</div>
        </button>
      </div>
      <div v-if="mode === 'campaign'" class="play-screen__games">
        <div class="play-screen__games__header">
          <div class="play-screen__mode__title">Campaigns</div>
          <div class="play-screen__mode__description">Win the battle for Wesnoth and all the lands of Irdya</div>
          <div class="play-screen__games__selector">
            Difficulty
            <select v-model="difficultiesFilter">
              <option v-for="(difficulties, i) in difficulties" :key="i">{{ difficulties}}</option>
            </select>
          </div>
        </div>
        <div class="play-screen__games__list">
          <button
            v-for="campaign in filteredCampaigns"
            :key="campaign.id"
            class="play-screen__game"
            @click="setCurrent(campaign)"
          >
            <img :src="campaign.icon" class="play-screen__game__icon" :class="current && current.id === campaign.id ? 'play-screen__game__icon--selected' : ''">
            <div class="play-screen__game__title">
              {{ campaign.name }}
            </div>
            <div v-if="campaign.achievements" class="play-screen__game__achievements">
              <w-achievement
                v-for="(achievement, i) in campaign.achievements.slice(0,5)"
                :key="i"
                v-bind="achievement"
                size="small"
              />
              <span v-if="campaign.achievements.length  > 5" class="play-screen__game__achievements__more">
                +{{ campaign.achievements.length -5 }} more
              </span>
            </div>
          </button>
        </div>
      </div>
      <div v-if="mode === 'scenario'" class="play-screen__games">
        <div class="play-screen__games__header">
          <div class="play-screen__mode__title">Scenarios</div>
          <div class="play-screen__mode__description">Challenge yourself with specially-designed maps and scenarios</div>
          <div class="play-screen__games__selector">
            View
            <select v-model="scenarioFilter">
              <option v-for="(scenarioType, i) in scenarioTypes" :key="i">{{ scenarioType}}</option>
            </select>
          </div>
        </div>
        <div class="play-screen__games__list">
          <button
            v-for="scenario in filteredScenarios"
            :key="scenario.id"
            class="play-screen__game"
            @click="setCurrent(scenario)"
          >
            <img :src="scenario.icon" class="play-screen__game__icon" :class="current && current.id === scenario.id ? 'play-screen__game__icon--selected' : ''">
            <div class="play-screen__game__title">
              {{ scenario.name }}
            </div>
            <div class="play-screen__game__type">
              {{ scenario.type }}
            </div>
            <div v-if="scenario.achievements" class="play-screen__game__achievements">
              <w-achievement
                v-for="(achievement, i) in scenario.achievements.slice(0,5)"
                :key="i"
                v-bind="achievement"
                size="small"
              />
              <span v-if="scenario.achievements.length  > 5" class="play-screen__game__achievements__more">
                +{{ scenario.achievements.length -5 }} more
              </span>
            </div>
          </button>
        </div>
      </div>
      <div v-if="mode === 'multiplayer'" class="play-screen__games">
        <button
          class="play-screen__game play-screen__game--no-icon"
          @click="setCurrent(scenario)"
        >
          <img src="/images/wesnoth-icon.png" class="play-screen__game__icon">
          <div class="play-screen__game__title">
            Multiplayer Lobby
          </div>
          <div>Find players to take on or team up with.</div>
          <w-button>Join</w-button>
        </button>
        <button
          class="play-screen__game play-screen__game--no-icon"
          @click="setCurrent(scenario)"
        >
          <div class="play-screen__game__title">
            Local Game
          </div>
          <div>Play with a friend on the same computer.</div>
          <w-button>Play Local</w-button>
        </button>
        <button
          class="play-screen__game play-screen__game--no-icon"
          @click="setCurrent(scenario)"
        >
          <div class="play-screen__game__title">
            Other Server
          </div>
          <div>Join another, unofficial Wesnoth multiplayer server.</div>
          <w-button>Join Other Server</w-button>
        </button>
      </div>
      <div class="play-screen__footer">
        <w-button @click="$emit('screen:set', 'main')">Back to Main Menu</w-button>
        <w-button>Load Game</w-button>
      </div>
    </div>
    <div class="play-screen__world">
      <div class="play-screen__map">
        <div class="play-screen__map__container" :style="mapPositionStyles">
          <img src="/images/wesnoth-full.jpg" class="play-screen__map__image">
        </div>
        <div class="play-screen__timeline">
          <div class="play-screen__timeline__ticks">
            <span class="play-screen__timeline__line"></span>
            <span class="play-screen__timeline__tick">200 BW</span>
            <span class="play-screen__timeline__tick">1 YW</span>
            <span class="play-screen__timeline__tick">200 YW</span>
            <span class="play-screen__timeline__tick">400 YW</span>
            <span class="play-screen__timeline__tick">600 YW</span>
            <span class="play-screen__timeline__tick">800 YW</span>
            <span class="play-screen__timeline__tick">1000 YW</span>
          </div>
          <div v-if="current" class="play-screen__timeline__range" :style="timelineRange"></div>
        </div>
        <div v-if="current" class="play-screen__details">
          <img
            v-if="current.image"
            :src="current.image"
            class="play-screen__details__image"
          >
          <div class="play-screen__details__title">
            {{ current.name }}
          </div>
          <div class="play-screen__details__scrollable">
            <div class="play-screen__details__description" v-html="current.description" />
            <table class="play-screen__details__table">
              <tr v-if="current.scenarios">
                <th>Scenarios</th>
                <td>{{ current.scenarios }}</td>
              </tr>
              <tr v-if="current.difficulties">
                <th>Difficulty</th>
                <td>{{ current.difficulties.join(', ') }}</td>
              </tr>
              <tr v-if="current.playerType">
                <th>Gameplay</th>
                <td>
                  {{ current.playerType }}
                </td>
              </tr>
              <tr v-if="current.players">
                <th>Sides</th>
                <td>
                  Up to {{ current.players }} sides
                </td>
              </tr>
            </table>
            <div v-if="current.achievements" class="play-screen__details__achievements">
              <h2>
                Achievements
              </h2>
              <w-achievement
                v-for="(achievement, i) in current.achievements"
                :key="i"
                v-bind="achievement"
              />
              <div>
                <w-button @click="showAchievements = true">View Achievements</w-button>
              </div>
            </div>
          </div>
          <div class="play-screen__details__actions">
            <w-button size="large" :primary="true">Play</w-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAchievements" class="play-screen__achievements__wrapper">
      <div class="play-screen__achievements">
        <h2>
          Achievements
        </h2>
        <div class="play-screen__details__achievements__list">
          <div
            v-for="(achievement, i) in current.achievements"
            :key="i"
            class="play-screen__achievement"
          >
            <img
              :src="achievement.image"
              :class="achievement.achieved ? '--achieved' : ''"
            >
            <div class="play-screen__achievements__text">
              <h3>{{ achievement.name }}</h3>
              <p>{{ achievement.description }}</p>
            </div>
          </div>
        </div>
        <w-button @click="showAchievements = false">Back</w-button>
      </div>
    </div>
  </div>
</template>

<script>
import WAchievement from './Achievement.vue';
import WButton from './Button.vue';
import campaigns from '../data/campaigns';
import scenarios from '../data/scenarios';

export default {
  name: 'PlayScreen',
  components: {
    WAchievement,
    WButton
  },
  data() {
    return {
      showAchievements: false,
      current: null,
      mode: '',
      campaigns: campaigns,
      difficultiesFilter: 'All',
      difficulties: ['All', 'novice', 'easy', 'normal', 'hard', 'nightmare'],
      scenarios: scenarios,
      scenarioFilter: 'All',
      scenarioTypes: ['All', 'Free-for-All', 'Survival', 'RPG']
    }
  },
  computed: {
    filteredCampaigns() {
      if (this.difficultiesFilter === 'All') {
        return this.campaigns;
      }
      return this.campaigns.filter(c => c.difficulties.includes(this.difficultiesFilter));
    },
    filteredScenarios() {
      if (this.scenarioFilter === 'All') {
        return this.scenarios;
      }
      return this.scenarios.filter(s => s.type === this.scenarioFilter);
    },
    mapPositionStyles() {
      if (this.current) {
        return {
          transform: `translate(${this.current.x}, ${this.current.y})`
        };
      }
      return {};
    },
    timelineRange() {
      if (!this.current || !this.current.start) {
        return {};
      }
      const left = Math.floor(this.getTimelinePosition(this.current.start) * 100);
      const right = Math.ceil(this.getTimelinePosition(this.current.end) * 100);
      const width = left > right ? (left - right) : 1;
      return {
        right: (right - width) + '%',
        width: width + '%',
      }
    }
  },
  methods: {
    alert(msg) {
      alert(msg);
    },
    getTimelinePosition(year) {
      const totalYears = 1400;
      const normalized = year + 200;
      const percent = (totalYears - normalized) / totalYears;
      return percent;
    },
    setMode(mode) {
      this.mode = mode;
      this.current = null;
    },
    setCurrent(game) {
      this.current = game;
    }
  }
}
</script>

<style>
.play-screen {
  display: grid;
  grid-template-columns: 40% 60%;
  height: 100vh;
}

.play-screen__footer {
  grid-column-start: 1;
  grid-column-end: 3;
  text-align: left;
  padding: 1rem;
  border-top: 1px solid #a48042;
  display: flex;
  align-items: center;
}

.play-screen__footer > * + * {
  margin-left: 1rem;
}

.play-screen__mode {
  position: relative;
  padding: 1rem 1rem 1rem 90px;
  background: transparent;
  border: none;
  color: #fff;
  text-align: left;
  min-height: 6.5rem;
}

.play-screen__mode__img {
  width: 3.75rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
  opacity: 0.5;
}

.play-screen__mode:hover .play-screen__mode__img,
.play-screen__mode__img--selected {
  opacity: 1;
}

.play-screen__mode__title {
  font-size: 1.3rem;
  font-weight: 700;
}

.play-screen__modes--collapsed {
  width: 5.75rem;
}

.play-screen__modes--collapsed .play-screen__mode__title,
.play-screen__modes--collapsed .play-screen__mode__description {
  display: none;
}

.play-screen__options {
  display: grid;
  grid-template-rows: auto 4rem;
  row-gap: 1rem;
  max-height: 100vh;
}

.play-screen--mode-selected .play-screen__options {
  grid-template-columns: 5.75rem auto;
}

.play-screen__games {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 1rem;
}

.play-screen__games__selector {
  margin: 1rem 0;
}

.play-screen__games__selector select {
  padding: 0.25rem;
  margin-left: 0.5rem;
  background: #001f34;
  border: 1px solid #a48042;
  border-radius: 2px;
  color: #bcad7e;
}

.play-screen__games__list {
  overflow-y: scroll;
}

.play-screen__game {
  position: relative;
  padding: 1rem 1rem 1rem 4.5rem;
  width: 100%;
  background: transparent;
  border: none;
  color: #fff;
  text-align: left;
}

.play-screen__game__icon {
  position: absolute;
  top: 50%;
  left: 0;
  width: 4.5rem;
  height: auto;
  transform: translateY(-50%);
  opacity: 0.5;
}

.play-screen__game .w-achievement--done {
  opacity: 0.5;
}

.play-screen__game:hover .w-achievement--done,
.play-screen__game:hover .play-screen__game__icon,
.play-screen__game__icon--selected {
  opacity: 1;
}

.play-screen__game__title {
  margin-bottom: 0.25rem;
  font-size: 1.2rem;
  font-weight: 700;
}

.play-screen__game__type {
  margin-top: -0.25rem;
  margin-bottom: 0.5rem;
  color: rgba(255,255,255,0.75);
}

.play-screen__game__achievements {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.play-screen__game__achievements .achievement {
  margin-right: 0.1rem;
}

.play-screen__game__achievements__more {
  position: relative;
  margin-left: 0.25rem;
  opacity: 0.75;
}

.play-screen__world {
  position: relative;
}

.play-screen__timeline {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 9999;
  right: 0.5rem;
  color: #a48042
}

.play-screen__timeline__ticks {
  background: #1e1c1b;
  display: flex;
  justify-content: space-between;
  border-radius: 2rem;
  font-size: 0.85rem;
}

.play-screen__timeline__line {
  position: absolute;
  top: 1rem;
  border-top: 1px solid #a48042;
  left: 1rem;
  right: 1rem;
}

.play-screen__timeline__tick {
  padding: 0.25rem 0.5rem;
  background: #1e1c1b;
  border-radius: 2rem;
  z-index: 999;
}

.play-screen__timeline__range {
  position: absolute;
  top: 0.25rem;
  bottom: 0.25rem;
  background: #001f34;
  border: 1px solid #bcad7e;
  z-index: 9999;
  border-radius: 0.2rem;
  transition: all 1s;
}

.play-screen__timeline__range-number {
  position: absolute;
  left: 50%;
  background: #1e1c1b;
  transform: translateX(-50%);
  padding: 0.25rem 1rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  font-size: 0.85rem;
}

.play-screen__map {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.play-screen__map__container {
  width: 3000px;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-100px, -1800px);
  transition: all 1s;
}

.play-screen__map__image {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
}

.play-screen__details {
  position: absolute;
  top: 3rem;
  bottom: 1rem;
  left: 1rem;
  width: 40%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(0,0,0,0.85);
  border: 1px solid #a48042;
}

.play-screen__details__image {
  width: 100%;
  height: auto;
}

.play-screen__details__title {
  padding: 1rem;
  font-size: 1.3rem;
  font-weight: 700;
  border-top: 1px solid #a48042;
  border-bottom: 1px solid #a48042;
}

.play-screen__details__scrollable {
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 1rem;
}

.play-screen__details__table {
  margin-top: 2rem;
  text-align: left;
}

.play-screen__details__table td {
  padding: 0.25rem;
  padding-left: 1rem;
}

.play-screen__details__achievements {
  margin-top: 2rem;
  padding-bottom: 2rem;
}

.play-screen__details__achievements .w-achievement {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.play-screen__details__achievements h2 {
  margin: 0 0 1rem;
  font-size: 1.3rem;
  font-weight: 700;
}

.play-screen__details__actions {
  margin-top: auto;
  padding: 1rem;
  text-align: right;
}

.play-screen__achievements__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
}

.play-screen__achievements  {
  position: absolute;
  max-height: 80%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  background: #1e1c1b;
  z-index: 99999;
  left: 50%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.play-screen__achievements h2 {
  margin-top: 0;
}

.play-screen__details__achievements__list {
  flex-grow: 1;
  overflow-y: scroll;
  padding-bottom: 1rem;
}

.play-screen__achievement {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.play-screen__achievement img {
  width: 4rem;
  margin-right: 1rem;
  opacity: 0.3;
}

.play-screen__achievement img.--achieved {
  opacity: 1;
}

.play-screen__achievement .w-btn {
  margin-top: 1rem;
}

.play-screen__achievements__text h3 {
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.5em;
}

.play-screen__achievements__text p {
  margin-top: 0;
}

@media (min-width: 1200px) {
  .play-screen {
    grid-template-columns: 25% 75%;
  }
}

@media (min-width: 1600px) {
  .play-screen {
    grid-template-columns: 25% 75%;
  }
}
</style>
